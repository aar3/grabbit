# pylint: disable=unused-argument

import datetime as dt
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from django.db.models.signals import post_save
from lib.models import BaseModel
from lib.utils import make_qrcode
from lib.cloud import GoogleCloudService
from merchant.managers import MerchantManager, RewardManager
from user.models import User


class Merchant(BaseModel):
    class Meta:
        db_table = "merchants"

    objects = MerchantManager()
    name = models.CharField(max_length=255)
    alternative_name = models.CharField(max_length=255, null=True)
    industry = models.JSONField(default=list)
    primary_color = models.CharField(max_length=255, default="#88888")
    keywords = models.JSONField(default=list)
    invitation_code = models.CharField(max_length=255, null=True)
    image_url = models.CharField(max_length=255, null=True)
    users = models.ManyToManyField(User)


class Campaign(BaseModel):
    class Meta:
        db_table = "campaigns"

    name = models.CharField(max_length=255)
    merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE)
    created_by_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="campaign_created_by_user")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    target_user_count = models.JSONField(default=dict)
    target_time_active = models.JSONField(default=dict)  # in days
    target_user_match = models.JSONField(default=dict)
    is_cancelled = models.IntegerField(default=0)
    keywords = models.JSONField(default=list)
    activated_on = models.DateTimeField(null=True)
    activated_by_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="activated_by_user")
    cancelled_by_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="cancelled_by_user")
    cancelled_on = models.DateTimeField(null=True)

    def expired(self):
        return timezone.now() < self.end_date

    def is_active(self):
        return not self.expired()

    def cancel(self, user):
        self.cancelled_by_user = user
        self.is_cancelled = True
        self.cancelled_on = timezone.now()
        self.save()

    def activate(self, user):
        self.activated_on = timezone.now()
        self.activated_by_user = user
        self.save()

    def derive_criteria(self):
        # TODO: derive specific criteria for profile
        pass


class RewardCode(BaseModel):
    class Meta:
        db_table = "reward_codes"

    code = models.CharField(max_length=255)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    value = models.JSONField(default=dict)
    is_active = models.IntegerField(default=0)
    description = models.TextField(null=True)
    created_by_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rewardcode_created_by_user")


class Reward(BaseModel):
    class Meta:
        db_table = "rewards"

    objects = RewardManager()

    code = models.ForeignKey(RewardCode, on_delete=models.CASCADE)
    expiry = models.DateTimeField()
    is_active = models.IntegerField(default=1)
    qr_code_url = models.CharField(max_length=255, null=True)
    redeemed_at = models.DateTimeField(null=True)
    owner_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner_user")

    def set_expiry(self):
        self.expiry = timezone.now() + dt.timedelta(days=7)

    def is_expired(self):
        return self.expiry <= timezone.now()

    def redeem(self):
        self.is_active = False
        self.redeemed_at = timezone.now()
        self.save()


# FIXME: implement this
# @receiver(post_save, sender=Reward)
# def create_qrcode_for_reward(sender, instance, created, **kwargs):
#     if created:
#         code = make_qrcode(instance.code)
#         img_path = GoogleCloudService.upload_image_to_bucket(instance.email, "qr_code", code)
#         instance.qr_code_url = img_path
#         instance.save()


@receiver(post_save, sender=Reward)
def create_notification_for_new_user_reward(sender, instance, created, **kwargs):
    from merchant.serializers import RewardSerializer
    from user.models import Notification

    serializer = RewardSerializer(instance)
    if created:
        """
        FIXME: This route_key should be 'rewardFocus', and on the client, we do something similar to:
        
        if route_key === 'rewardFocus':
            dispatch({
              type: A.SetFocusedReward.
              payload: metadata
        })

        Where we set `state.rewards.focused` to be `notification.metadata`
        """
        _ = Notification.objects.create(
            user=instance.owner_user,
            icon="dollar-sign",
            route_key="listRewards",
            metadata=serializer.data,
            text="You've updated your profile settings",
        )
