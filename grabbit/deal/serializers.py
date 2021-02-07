from lib.serializers import BaseModelSerializer
from deal.models import Deal, MatchedDeal, WatchList, Like, Brand, FollowedBrand
from user.serializers import UserSerializer


class BrandSerializer(BaseModelSerializer):
    class Meta:
        model = Brand
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "img_url",
            "name",
            "color_code",
            "description",
        ]


class DealSerializer(BaseModelSerializer):
    brand = BrandSerializer(read_only=True)

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
            "brand",
        ]


class MatchedDealserializer(BaseModelSerializer):
    deal = DealSerializer(read_only=True)

    class Meta:
        model = MatchedDeal
        fields = ["id", "created_at", "updated_at", "deleted_at", "user_id", "deal"]


class WatchListSerializer(BaseModelSerializer):
    deal = DealSerializer(read_only=True)

    class Meta:
        model = WatchList
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "user_id",
            "deal",
        ]


class LikeSerializer(BaseModelSerializer):
    deal = DealSerializer(read_only=True)

    class Meta:
        model = Like
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "user_id",
            "deal",
        ]


class FollowedBrandSerializer(BaseModelSerializer):
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = FollowedBrand
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "brand",
            "user_id",
        ]
