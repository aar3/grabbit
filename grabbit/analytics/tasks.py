from django.shortcuts import get_object_or_404
from user.models import User
from merchant.models import Campaign, Merchant, RewardCode, Reward
from plaid_local.models import Transaction
from analytics.ml import build_user_transaction_profile, transaction_profile_matches_campaign_criteria


def assign_reward_codes_to_relevant_users_based_on_campaign():
    merchants = Merchant.objects.all()
    users = User.objects.all()
    for merchant in merchants:
        if merchant.deleted_at:
            continue
        campaigns = Campaign.objects.filter(merchant__id=merchant.id)
        for campaign in campaigns:
            codes = RewardCode.objects.filter(campaign__id=campaign.id)
            matches = []
            for user in users:
                transactions = Transaction.objects.filter(user__id=user.id)
                profile = build_user_transaction_profile(user, transactions)
                if transaction_profile_matches_campaign_criteria(profile, codes.derive_criteria()):
                    matches.append((user, code))

            for (user, code) in matches:
                reward = RewardCode.objects.create(created_by_user=user, code=code, campaign=campaign)
                reward.set_active()
