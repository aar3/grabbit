from django.shortcuts import get_object_or_404
from user.models import User
from plaid_local.models import Transaction
from analytics.ml import build_user_transaction_profile, transaction_profile_matches_campaign_criteria


def assign_reward_codes_to_relevant_users_based_on_campaign():
    pass
