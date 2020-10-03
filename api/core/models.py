# pylint: disable=unused-argument

import hashlib
import random
import datetime as dt

from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

from lib.utils import random_string, make_qrcode
from lib.const import UserType
from lib.gcloud import GoogleCloudService
from lib.gredis import SessionToken, RedisClient
from core.managers import *


DEFAULT_PROFILE_IMAGE = "https://www.teamunhcr.org.au/images/empty-profile-image.jpg"


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
    if created:
        code = make_qrcode(instance.username)
        img_path = GoogleCloudService.upload_asset_to_bucket(instance.id, instance.username, UserType.BROKER, code)
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


class Product(BaseModel):
    class Meta:
        db_table = "products"

    objects = ProductManager()

    name = models.CharField(max_length=255)
    description = models.TextField()
    merchant = models.ForeignKey(User, on_delete=models.CASCADE)
    terms = models.TextField()

    image_url_1 = models.CharField(max_length=255, null=True)
    image_url_2 = models.CharField(max_length=255, null=True)
    image_url_3 = models.CharField(max_length=255, null=True)
    image_url_4 = models.CharField(max_length=255, null=True)


class Offer(BaseModel):
    class Meta:
        db_table = "offers"

    uid = models.CharField(max_length=255)
    offeree = models.ForeignKey(User, on_delete=models.CASCADE, related_name="offeree")
    offerer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="offerer")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def set_uid(self):
        self.uid = random_string(10)


@receiver(post_save, sender=Offer)
def notify_new_offer_to_offeree(sender, instance, created, **kwargs):
    if created:
        text = instance.offerer.username + " is offering to match with you for product: " + instance.product.name
        _ = Notification.objects.create(
            text=text, user=instance.offeree, item_type=NotificationItemType.Offer, item=instance
        )


@receiver(post_save, sender=Offer)
def notify_new_offer_to_offerer(sender, instance, created, **kwargs):
    if created:
        text = instance.offer.offeree.username + " has accepted your offer for product " + instance.offer.product.name
        _ = Notification.objects.create(
            text=text, user=instance.offerer, item_type=NotificationItemType.Offer, item=instance
        )


class Conversation(BaseModel):
    class Meta:
        db_table = "conversations"

    person_a = models.ForeignKey(User, on_delete=models.CASCADE, related_name="person_a")
    person_b = models.ForeignKey(User, on_delete=models.CASCADE, related_name="person_b")


class Message(BaseModel):
    class Meta:
        db_table = "messages"

    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recipient")
    text = models.TextField()


@receiver(post_save, sender=Offer)
def notify_new_message_to_recipient(sender, instance, created, **kwargs):
    if created:
        text = instance.sender.username + " sent you a new message."
        _ = Notification.objects.create(
            text=text, user=instance.recipient, item_type=NotificationItemType.Message, item=instance
        )


class Grab(BaseModel):
    class Meta:
        db_table = "grabs"

    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    expiry = models.DateTimeField()
    additional_comments = models.TextField()

    def has_expired(self):
        return self.expiry > dt.datetime.now()


class Carriers:
    UPS = 0
    USPS = 1
    FedEx = 2
    DHL = 3
    Amazon = 4


class Shipment(BaseModel):
    class Meta:
        db_table = "shipments"

    grab = models.ForeignKey(Grab, on_delete=models.CASCADE)
    carrier = models.IntegerField()  # Carriers
    tracking_number = models.CharField(max_length=255)
    expected_delivery = models.DateTimeField()


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
    11: "chat",
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


class AttributionStat(BaseModel):
    class Meta:
        db_table = "attribution_stats"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    broker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="broker")
    merchant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="merchant")
    metric_json = models.JSONField(default=dict)
