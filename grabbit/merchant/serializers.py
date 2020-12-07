from lib.serializers import BaseModelSerializer
from merchant.models import Reward, Merchant, Campaign
from user.serializers import UserSerializer


class MerchantSerializer(BaseModelSerializer):
    # users = UserSerializer(read_only=True, many=True)
    class Meta:
        model = Merchant
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "name",
            "keywords",
            "industry",
            "users",
        ]


class RewardSerializer(BaseModelSerializer):
    class Meta:
        model = Reward
        fields = ["id", "created_at", "updated_at", "deleted_at", "code", "expiry", "campaign"]


class CampaignSerializer(BaseModelSerializer):
    class Meta:
        model = Campaign
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "name",
            "merchant",
            "start_date",
            "end_date",
            "target_user_count",
            "target_time_active",
            "target_user_match",
        ]
