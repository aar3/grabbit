from rest_framework import serializers

from core.models import *


class BaseModelSerializer(serializers.ModelSerializer):
    pass


class UserSerializer(BaseModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "qr_code_url",
            "name",
            "email",
            "address_line1",
            "address_line1",
            "session_token_key",
            "phone",
            "profile_image_url",
        ]


class NotificationSerializer(BaseModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "text",
            "seen",
            "user",
            "item_type",
            "item",
        ]


class BrandSerializer(BaseModelSerializer):
    class Meta:
        model = Brand
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "name",
            "description",
            "image_url",
        ]


class CampaignCodeSerializer(BaseModelSerializer):
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = CampaignCode
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "brand",
            "code",
        ]
