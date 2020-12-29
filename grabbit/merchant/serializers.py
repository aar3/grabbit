from lib.serializers import BaseModelSerializer
from merchant.models import Reward, Merchant, Campaign, RewardCode
from user.serializers import UserSerializer


class MerchantSerializer(BaseModelSerializer):
    users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Merchant
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "name",
            "alternative_name",
            "image_url",
            "primary_color",
            "keywords",
            "industry",
            "users",
        ]


class CampaignSerializer(BaseModelSerializer):
    merchant = MerchantSerializer(read_only=True)

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


class RewardCodeSerializer(BaseModelSerializer):
    created_by_user = UserSerializer(read_only=True)
    campaign = CampaignSerializer(read_only=True)

    class Meta:
        model = RewardCode
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "code",
            "campaign",
            "value",
            "is_active",
            "description",
            "created_by_user",
        ]


class RewardSerializer(BaseModelSerializer):
    code = RewardCodeSerializer(read_only=True)

    class Meta:
        model = Reward
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "code",
            "expiry",
        ]
