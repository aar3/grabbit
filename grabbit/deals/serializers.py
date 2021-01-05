from lib.serializers import BaseModelSerializer
from deals.models import Deal


class DealSerializer(BaseModelSerializer):
    class Meta:
        model = Deal
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "user_id",
            "title",
            "value",
            "discount",
            "merchant_name",
            "url",
            "img_url",
            "description",
            "uid",
        ]
