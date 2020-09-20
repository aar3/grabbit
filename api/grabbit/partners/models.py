# pylint: disable=unused-argument

import hashlib
import random
import datetime as dt

from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

from grabbit.utils import random_string
from grabbit.redis import SessionToken, RedisClient
from partners.managers import *


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
def notify_new_account(sender, instance, created, **kwargs):
    if created:
        _ = Notification.objects.create(text="Welcome to Grabbit!", user=instance)


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
    offer_expiry = models.DateTimeField()

    image_url_1 = models.CharField(max_length=255, null=True)
    image_url_2 = models.CharField(max_length=255, null=True)
    image_url_3 = models.CharField(max_length=255, null=True)
    image_url_4 = models.CharField(max_length=255, null=True)

    def has_expired(self):
        return self.expiry > dt.datetime.now()


class NotificationItemType:
    NewProduct = 0
    NewOffer = 1
    NewMatch = 2
    GeneralInfo = 3
    NewProduct = 4
    GrabbedItem = 5
    LikedItem = 6
    NewReview = 7
    AccountInfoChange = 8
    ProductShipped = 9
    ProductReceived = 10


class Notification(BaseModel):
    class Meta:
        db_table = "notifications"

    text = models.CharField(max_length=255)
    seen = models.BooleanField(default=False)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    item_type = models.IntegerField()  #  NotificationItemType
    item_route_key = models.CharField(max_length=255)
    item_route_meta = models.JSONField(default=dict)


class Interest(BaseModel):
    class Meta:
        db_table = "interests"

    email = models.CharField(max_length=255, primary_key=True)


class Like(BaseModel):
    class Meta:
        db_table = "likes"

    objects = LikeManager()

    broker = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.CASCADE)


@receiver(post_save, sender=Like)
def notify_new_like(sender, instance, created, **kwargs):
    if created:
        text = instance.broker.username + " liked your product: " + instance.product.name
        _ = Notification.objects.create(text=text, user=instance.broker)


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
        _ = Notification.objects.create(text=text, user=instance.offeree)


class Match(BaseModel):
    class Meta:
        db_table = "matches"

    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)


@receiver(post_save, sender=Offer)
def notify_new_match_to_offeree(sender, instance, created, **kwargs):
    if created:
        text = "You've been matched with " + instance.offer.offerer + " for Offer #" + instance.offer.uid
        _ = Notification.objects.create(text=text, user=instance.offeree)


@receiver(post_save, sender=Offer)
def notify_new_match_to_offerer(sender, instance, created, **kwargs):
    if created:
        text = instance.offer.offeree.username + " has accepted your offer for product " + instance.offer.product.name
        _ = Notification.objects.create(text=text, user=instance.offerer)


class Message(BaseModel):
    class Meta:
        db_table = "messages"

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recipient")
    text = models.TextField()


@receiver(post_save, sender=Offer)
def notify_new_message(sender, instance, created, **kwargs):
    if created:
        text = instance.sender.username + " sent you a new message."
        _ = Notification.objects.create(text=text, user=instance.sender)


class AttributionStat(BaseModel):
    class Meta:
        db_table = "attribution_stats"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    broker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='broker')
    merchant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='merchant')
    metric_json = models.JSONField(default=dict)


class Grab(BaseModel):
    class Meta:
        db_table = "grabs"

    match = models.ForeignKey(Match, on_delete=models.CASCADE)
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

class ShippedItem(BaseModel):
    class Meta:
        db_table = "shipped_items"

    grabbed_item = models.ForeignKey(Grab, on_delete=models.CASCADE)
    carrier = models.IntegerField()
    tracking_number = models.CharField(max_length=255)
    expected_delivery_date = models.DateTimeField()

    