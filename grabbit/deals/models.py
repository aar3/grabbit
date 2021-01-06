import hashlib
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from user.models import User
from deals.managers import DealManager
from lib.models import BaseModel
from lib.const import EMPTY_IMAGE_URL


class Deal(BaseModel):
    objects = DealManager()

    class Meta:
        db_table = "deals"

    title = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    discount = models.CharField(max_length=255)
    merchant_name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    img_url = models.CharField(max_length=255, default=EMPTY_IMAGE_URL)
    description = models.TextField(null=True)
    uid = models.CharField(max_length=255)

    def set_uid(self):
        # NOTE: assuming these values are reliably consistent
        payload = self.title.lower() + str(self.value) + self.merchant_name.lower()
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
