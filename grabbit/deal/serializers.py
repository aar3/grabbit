from lib.serializers import BaseModelSerializer
from deal.models import Deal, MatchedDeal
from user.serializers import UserSerializer


class DealSerializer(BaseModelSerializer):
    class Meta:
        model = Deal
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "title",
            "current_value",
            "original_value",
            "merchant_name",
            "url",
            "img_url",
            "all_img_urls",
            "description",
            "uid",
        ]


class UserDealSerializer(BaseModelSerializer):
    deal = DealSerializer(read_only=True)

    class Meta:
        model = MatchedDeal
        fields = ["id", "created_at", "updated_at", "deleted_at", "user_id", "deal", "is_on_watchlist"]
