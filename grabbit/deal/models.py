import hashlib
import enum
import datetime as dt
from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from user.models import User, Notification
from lib.const import EMPTY_IMAGE_URL, NotificationIcons
from lib.models import BaseModel


class Deal(BaseModel):
    class Meta:
        db_table = "deals"

    title = models.TextField()
    current_value = models.CharField(max_length=255)
    original_value = models.CharField(max_length=255)
    merchant_name = models.CharField(max_length=255)
    url = models.TextField()
    category = models.JSONField(default=list)
    scraper = models.CharField(max_length=255)
    img_url = models.CharField(max_length=255, default=EMPTY_IMAGE_URL)
    price_history = models.JSONField(default=list)
    expired_on = models.DateTimeField(null=True)
    product_keywords = models.JSONField(default=list)
    all_img_urls = models.JSONField(default=list)
    description = models.TextField(null=True)
    uid = models.CharField(max_length=255)

    def set_uid(self):
        # NOTE: assuming the URL is a reliably consistent identifier
        self.uid = hashlib.sha256(self.url.encode()).hexdigest()

    def save(self, other=None):
        # NOTE: If we run into a deal that we've already scraped, bump this current instance's
        # info to the the price_history list, and update the `other` deal accordingly
        if other:
            now = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            other.price_history.append({"current": other.current_value, "original": other.original_value, "date": now})

            other.current_value = self.current_value
            other.original_value = self.original_value
            other.save()
            return None
        super(Deal, self).save()

    def last_scraped_today(self):
        # pylint: disable=unsubscriptable-object
        last_update = self.price_history[-1]["date"] if self.current_value else self.created_at
        if isinstance(last_update, str):
            last_update = dt.datetime.strptime(last_update, "%Y-%m-%d %H:%M:%S")
        delta = dt.datetime.now() - last_update
        return delta.days < 1


class MatchedDeal(BaseModel):
    class Meta:
        db_table = "matched_deals"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE)
    is_on_watchlist = models.IntegerField(default=0)


@receiver(post_save, sender=MatchedDeal)
def create_notification_for_new_matched_deal(sender, instance, created, **kwargs):
    if created:
        _ = Notification.objects.create(
            user=instance.user,
            icon=NotificationIcons.BagHandleOutline.value,
            route_key="dealFocus",
            title="New deal match",
            text="We found a new deal for you",
        )


class WatchList(BaseModel):
    class Meta:
        db_table = "watch_lists"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE)


class Like(BaseModel):
    class Meta:
        db_table = "likes"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE)


class Brand(BaseModel):
    class Meta:
        db_table = "brands"

    name = models.CharField(max_length=255, unique=True)
    img_url = models.CharField(max_length=255, default=EMPTY_IMAGE_URL)


class FollowedBrand(BaseModel):
    class Meta:
        db_table = "followed_brands"

    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
