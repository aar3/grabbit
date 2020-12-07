from django.shortcuts import get_object_or_404
from django.utils import timezone
from lib.managers import BaseManager
from user.models import User


class MerchantManager(BaseManager):
    pass


class CampaignManager(BaseManager):
    def create(
        self,
        name,
        merchant,
        start_date,
        end_date,
        target_user_count=dict,
        target_time_active=dict,
        target_user_match=dict,
        keywords=list,
    ):
        start_date = timezone.make_aware(start_date)
        end_date = timezone.make_aware(end_date)
        instance = self.model(
            name=name,
            merchant=merchant,
            start_date=start_date,
            end_date=end_date,
            target_user_count=target_user_count,
            target_time_active=target_time_active,
            target_user_match=target_user_match,
            keywords=keywords,
        )
        instance.save()

        return instance


class RewardManager(BaseManager):
    def create(self, code, amount, created_by, campaign, expiry=None):
        from merchant.models import Campaign

        user = get_object_or_404(User, pk=created_by)
        campaign = get_object_or_404(Campaign, pk=campaign)
        instance = self.model(code=code, amount=amount, created_by=user, campaign=campaign, expiry=expiry)
        instance.set_expiry()
        instance.save()
        return instance
