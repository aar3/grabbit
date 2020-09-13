# pylint: disable=unused-argument

import hashlib
import random

from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

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
    phone = models.CharField(max_length=255, null=True)
    secret = models.CharField(max_length=255)
    salt = models.IntegerField()
    session_token_key = models.CharField(max_length=255)
    user_meta = models.JSONField(default=dict)
    type = models.CharField(max_length=255)
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    image_url_1 = models.CharField(max_length=255, null=True)
    image_url_2 = models.CharField(max_length=255, null=True)
    image_url_3 = models.CharField(max_length=255, null=True)
    image_url_4 = models.CharField(max_length=255, null=True)


class Notification(BaseModel):
    class Meta:
        db_table = "notifications"

    text = models.CharField(max_length=255)
    seen = models.BooleanField(default=False)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)


class Interest(BaseModel):
    class Meta:
        db_table = "interests"

    email = models.CharField(max_length=255, primary_key=True)


class LikeFor:
    Merchant = 0
    Product = 1
    Broker = 2


class Like(BaseModel):
    class Meta:
        db_table = "likes"

    objects = LikeManager()

    liked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    like_for = models.IntegerField()
    merchant = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="merchant"
    )
    product = models.ForeignKey(
        Product, null=True, on_delete=models.CASCADE, related_name="product"
    )
    broker = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="broken"
    )


@receiver(post_save, sender=Like)
def notify_new_like(sender, instance, created, **kwargs):
    def format_like_msg(like):
        if like.like_for == LikeFor.Merchant:
            return f"{like.liked_by.username} liked your merchant store {like.merchant.name}"

        if like.like_for == LikeFor.Product:
            return f"{like.liked_by.username} liked your product {like.product.name}"

        return f"{like.liked_by.name} liked your Grabber profile"

    if created:
        text = format_like_msg(instance)
        _ = Notification.objects.create(text=text, user=instance.liked_by)


class Offer(BaseModel):
    class Meta:
        db_table = "offers"

    # broker
    offeree = models.ForeignKey(User, on_delete=models.CASCADE, related_name="offeree")
    # merchant
    offerer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="offerer")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    terms = models.TextField()


@receiver(post_save, sender=Offer)
def notify_new_offer(sender, instance, created, **kwargs):
    if created:
        text = f"{instance.offerer.username} has extended an offer to you for {instance.product.name}. <a href='#'>Click here to view the offer terms</a>"
        _ = Notification.objects.create(text=text, user=instance.offeree)


class Match(BaseModel):
    class Meta:
        db_table = "matches"

    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)


@receiver(post_save, sender=Offer)
def notify_new_offer_to_offeree(sender, instance, created, **kwargs):
    if created:
        text = f"You've been matched with {instance.offer.offerer} for Offer #{instance.offer.id}"
        _ = Notification.objects.create(text=text, user=instance.offeree)


@receiver(post_save, sender=Offer)
def notify_new_offer_to_offerer(sender, instance, created, **kwargs):
    if created:
        text = f"{instance.offer.offeree.username} has accepted your offer for {instance.offer.product.name}"
        _ = Notification.objects.create(text=text, user=instance.offerer)


class Message(BaseModel):
    class Meta:
        db_table = "messages"

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="recipient"
    )
    text = models.TextField()


@receiver(post_save, sender=Offer)
def notify_new_message(sender, instance, created, **kwargs):
    if created:
        text = f"{instance.sender.username} sent you a new message"
        _ = Notification.objects.create(text=text, user=instance.sender)
