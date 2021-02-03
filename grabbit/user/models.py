# pylint: disable=unused-argument

import hashlib
import random
import json
import pickle
import datetime as dt
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save
from lib.models import BaseModel
from lib.utils import make_qrcode, random_string, django_unix_client
from lib.const import NotificationIcons
from lib.cloud import GoogleCloudService
from lib.local_redis import get_redis_instance
from user.managers import UserManager

redis = get_redis_instance(host=settings.REDIS_HOST, port=settings.REDIS_DEFAULT_PORT)


class User(BaseModel):
    class Meta:
        db_table = "users"
        unique_together = ("salt", "secret")

    is_authenticated = False
    objects = UserManager()

    email = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, null=True)
    secret = models.CharField(max_length=255)
    salt = models.IntegerField()
    current_session_token = models.CharField(max_length=255)

    def matches_secret(self, other):
        data = other + str(self.salt)
        return hashlib.sha256(data.encode()).hexdigest() == self.secret

    def set_salt(self):
        self.salt = random.randint(10e2, 10e5)

    def set_secret(self, plaintext):
        data = plaintext + str(self.salt)
        hashed = hashlib.sha256(data.encode()).hexdigest()
        self.secret = hashed


@receiver(post_save, sender=User)
def create_session_for_new_user(sender, instance, created, **kwargs):
    from user.serializers import UserSerializer

    if created:
        serializer = UserSerializer(instance)
        key = random_string(n=10)
        instance.current_session_token = key
        _ = redis.set(key, json.dumps(serializer.data).encode())
        instance.save()


@receiver(post_save, sender=User)
def update_session_for_existing_user(sender, instance, created, **kwargs):
    from user.serializers import UserSerializer

    if not created:
        serializer = UserSerializer(instance)
        _ = redis.set(instance.current_session_token, json.dumps(serializer.data).encode())


@receiver(post_save, sender=User)
def create_new_account_notification(sender, instance, created, **kwargs):
    if created:
        _ = Notification.objects.create(user=instance, icon="user", text="Welcome to Grabbit!")


# @receiver(post_save, sender=User)
# def create_qr_code_for_new_user(sender, instance, created, **kwargs):
#     # TODO: qr code should contain what exactly?
#     if created:
#         code = make_qrcode(instance.username)
#         img_path = GoogleCloudService.upload_image_to_bucket(instance.email, "qr_code", code)
#         instance.qr_code_url = img_path
#         instance.save()


class Login(BaseModel):
    class Meta:
        db_table = "logins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)
    user_agent = models.CharField(max_length=255, null=True)


@receiver(post_save, sender=Login)
def create_new_session_token_for_authd_user(sender, instance, created, **kwargs):
    from user.serializers import UserSerializer

    if created:
        serializer = UserSerializer(instance.user)
        key = random_string(n=10)
        instance.user.current_session_token = key
        _ = redis.set(key, json.dumps(serializer.data).encode())
        instance.user.save()


class Notification(BaseModel):
    class Meta:
        db_table = "notifications"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    title = models.CharField(max_length=255, default="Untitled")
    icon = models.CharField(max_length=255, default="user")
    expiry = models.DateTimeField(null=True)
    route_key = models.CharField(max_length=255, null=True)
    metadata = models.JSONField(default=dict)
    seen_at = models.DateTimeField(null=True)


class Setting(BaseModel):
    class Meta:
        db_table = "settings"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    keywords = models.JSONField(default=dict)
    targeting_enabled = models.IntegerField(default=1)


@receiver(post_save, sender=User)
def create_settings_for_new_user(sender, instance, created, **kwargs):
    if created:
        _ = Setting.objects.create(user=instance, keywords=[])


@receiver(post_save, sender=Setting)
def create_notification_for_updated_settings(sender, instance, created, **kwargs):
    from user.serializers import NotificationSerializer

    if not created:
        instance = Notification.objects.create(
            user=instance.user,
            icon=NotificationIcons.LockClosedOutline.value,
            route_key="settings",
            title="Profile Update",
            text="You've updated your profile settings",
        )
        serializer = NotificationSerializer(instance)
        data = pickle.dumps(
            (instance.user.id, serializer.data, instance._meta.verbose_name.lower(), "IncomingNotification")
        )
        django_unix_client(data)
