import hashlib
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from user.models import User, Notification
from lib.const import EMPTY_IMAGE_URL
from lib.models import BaseModel


class Deal(BaseModel):
    class Meta:
        db_table = "deals"

    title = models.CharField(max_length=255)
    current_value = models.CharField(max_length=255)
    original_value = models.CharField(max_length=255)
    merchant_name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    scraper = models.CharField(max_length=255)
    img_url = models.CharField(max_length=255, default=EMPTY_IMAGE_URL)
    keywords = models.JSONField(default=list)
    all_img_urls = models.JSONField(default=list)
    description = models.TextField(null=True)
    uid = models.CharField(max_length=255)

    def set_uid(self):
        # NOTE: assuming these values are reliably consistent
        payload = self.title.lower() + str(self.current_value) + self.merchant_name.lower()
        self.uid = hashlib.sha256(payload.encode()).hexdigest()

    def save(self):
        other = Deal.objects.filter(uid=self.uid)
        if other:
            return -1
        super(Deal, self).save()


class UserDeal(BaseModel):
    class Meta:
        db_table = "user_deals"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE)


@receiver(post_save, sender=UserDeal)
def create_notification_for_new_user_deal(sender, instance, created, **kwargs):
    if created:
        _ = Notification.objects.create(
            user=instance.user,
            icon="dollar-sign",
            route_key="dealFocus",
            title="New deal match",
            text="We found a new deal for you",
        )
