from django.urls import path, include, re_path
from rest_framework import routers
from merchant.views import (
    MerchantViewSet,
    RewardCodeViewSet,
    RewardViewSet,
    CampaignViewSet,
    redeem_campaign_reward,
    activate_merchant_campaign,
    add_user_to_merchant_account,
)

router = routers.DefaultRouter()
router.register(r"accounts", MerchantViewSet, basename="merchant")
router.register(r"(\d+)/codes", RewardCodeViewSet, basename="rewardcode")
router.register(r"(\d+)/campaigns", CampaignViewSet, basename="campaign")

urlpatterns = [
    path(r"merchant/", include(router.urls)),
    re_path(r"merchant/(\d+)/users/", add_user_to_merchant_account),
    re_path(r"merchant/(\d+)/campaign/(\d+)/activate/", activate_merchant_campaign),
    path(r"merchant/reward/<str:code>/redeem/", redeem_campaign_reward),
]
