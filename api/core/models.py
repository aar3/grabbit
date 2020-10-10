# pylint: disable=unused-argument

import hashlib
import random
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

from lib.utils import make_qrcode
from lib.const import UserType, DEFAULT_PROFILE_IMAGE
from lib.gcloud import GoogleCloudService
from lib.gredis import SessionToken, RedisClient
from core.managers import *


class BaseModel(models.Model):
    class Meta:
        abstract = True

    use_in_migrations = True
    paranoid = True
    objects = BaseManager()

    created_at = models.DateTimeField(default=timezone.now, null=True)
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)


class User(BaseModel):
    class Meta:
        db_table = "users"
        unique_together = ("salt", "secret")

    is_authenticated = False
    objects = UserManager()

    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, null=True)
    username = models.CharField(max_length=255)
    address_line1 = models.CharField(max_length=255, null=True)
    address_line2 = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=255, null=True)
    secret = models.CharField(max_length=255)
    salt = models.IntegerField()
    session_token_key = models.CharField(max_length=255)
    user_meta = models.JSONField(default=dict)
    type = models.CharField(max_length=255)
    qr_code_url = models.CharField(max_length=255)
    site_url = models.CharField(max_length=255, null=True)
    profile_image_url = models.CharField(max_length=255, default=DEFAULT_PROFILE_IMAGE,)

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
    if created:
        session = SessionToken(user_id=instance.id)
        key = session.key[:]
        _ = RedisClient.set(key, session.serialize())

        instance.session_token_key = key
        instance.save()


@receiver(post_save, sender=User)
def create_qr_code_for_new_user(sender, instance, created, **kwargs):
    # TODO: qr code should contain what exactly?
    if created:
        code = make_qrcode(instance.username)
        img_path = GoogleCloudService.upload_asset_to_bucket(instance.email, UserType.BROKER, "qr_code", code)
        instance.qr_code_url = img_path
        instance.save()


@receiver(post_save, sender=User)
def notify_new_account(sender, instance, created, **kwargs):
    if created:
        _ = Notification.objects.create(
            text="Welcome to Grabbit!", user=instance, item_type=NotificationItemType.General
        )


class Login(BaseModel):
    class Meta:
        db_table = "logins"

    objects = LoginManager()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)


class Brand(BaseModel):
    class Meta:
        db_table = "brands"

    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    image_url = models.CharField(max_length=255, default=DEFAULT_PROFILE_IMAGE)


class CampaignCode(BaseModel):
    class Meta:
        db_table = "campaign_codes"

    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    code = models.CharField(max_length=255)
    expiry = models.DateTimeField()


class NotificationItemType:
    Offer = 1
    General = 3
    AddedProduct = 4
    Grab = 5
    Feedback = 7
    Shipped = 9
    ShipmentReceived = 10
    Message = 11


ItemRouteKeyMap = {
    1: "offer",
    2: "acctSettings",
    3: "productInfo",
    5: "productInfo",
    7: "feedback",
    9: "history",
    10: "history",
    11: "chatView",
}


class Notification(BaseModel):
    class Meta:
        db_table = "notifications"

    text = models.CharField(max_length=255)
    seen = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_type = models.IntegerField()  #  NotificationItemType
    _item_route_key = models.CharField(max_length=255, db_column="item_route_key")
    item = models.JSONField(default=dict)

    def set_meta(self, item_type, item):
        route_key = ItemRouteKeyMap[item_type]
        self._item_route_key = route_key
        self.item = item or dict
