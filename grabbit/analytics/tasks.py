from django.shortcuts import get_object_or_404
from user.models import User
from merchant.models import Campaign, Merchant, RewardCode, Reward


def assign_reward_codes_to_relevant_users_based_on_campaign():
    merchants = Merchant.objects.all()
    for merchant in merchants:
        if merchant.deleted_at:
            continue
        campaigns = Campaign.objects.filter(merchant__id=merchant.id)
        for campaign in campaigns:
            pass
            # 1. extract the user filter parameters
            # 2. Get the users whose transaction profiles fit these parameters
            # 3. Generate rewards codes for these users
    return
