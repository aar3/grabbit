from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from lib.models import BaseModel
from user.models import User


class LinkToken(BaseModel):
    class Meta:
        db_table = "link_tokens"

    token = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Link(BaseModel):
    class Meta:
        db_table = "links"

    public_token = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)
    item_id = models.CharField(max_length=255)
    institution_name = models.CharField(max_length=255)
    institution_id = models.CharField(max_length=255)
    accounts = models.JSONField(default=dict)
    link_session_id = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class TransactionTask(BaseModel):
    class Meta:
        db_table = "transaction_tasks"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    did_complete = models.IntegerField()


class Transaction(BaseModel):
    class Meta:
        db_table = "transactions"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    account_id = models.CharField(max_length=255)
    category = models.JSONField()
    date = models.DateTimeField()
    location = models.JSONField(default=dict)
    merchant_name = models.CharField(max_length=255)
    payment_channel = models.CharField(max_length=255)
    payment_meta = models.JSONField(default=dict)
    pending = models.IntegerField()
    transaction_id = models.CharField(max_length=255)
