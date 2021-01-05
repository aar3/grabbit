import hashlib
from django.db import models
from user.models import User
from lib.models import BaseModel


class Deal(BaseModel):
    class Meta:
        db_table = "deals"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    discount = models.CharField(max_length=255)
    merchant_name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    img_url = models.CharField(max_length=255)
    description = models.TextField(null=True)
    uid = models.CharField(max_length=255)

    def set_uid(self):
        # NOTE: assuming these values are reliably consistent
        payload = self.title.lower() + str(self.value) + self.merchant_name.lower()
        self.uid = hashlib.sha256(payload.encode()).hexdigest()
