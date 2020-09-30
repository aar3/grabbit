from rest_framework import serializers

from partners.models import *


class BaseModelSerializer(serializers.ModelSerializer):
    pass


class BasicSerializer(serializers.BaseSerializer):
    pass


class UserSerializer(BaseModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "name",
            "email",
            "address_line1",
            "address_line1",
            "session_token_key",
            "phone",
            "profile_image_url",
        ]


class ProductSerializer(BaseModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "name",
            "description",
            "user",
            "image_url_1",
            "image_url_2",
            "image_url_3",
            "image_url_4",
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


class OfferSerializer(BaseModelSerializer):
    offeree = UserSerializer(read_only=True)
    offerer = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Offer
        fields = [
            "id",
            "created_at",
            "updated_at",
            "offeree",
            "offerer",
            "product",
            "pending",
        ]


class MessageSerializer(BaseModelSerializer):
    recipient = UserSerializer(read_only=True)
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "created_at",
            "updated_at",
            "recipient",
            "sender",
            "text",
        ]


class BrokerHistorySerializer(BasicSerializer):
    pass