from lib.serializers import BaseModelSerializer
from deals.models import Deal, UserDeal
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
            "value",
            "discount",
            "merchant_name",
            "url",
            "img_url",
            "description",
            "uid",
        ]


class UserDealSerializer(BaseModelSerializer):
    user = UserSerializer(read_only=True)
    deal = DealSerializer(read_only=True)

    class Meta:
        model = Deal
        fields = ["id", "created_at", "updated_at", "deleted_at", "user", "deal"]
