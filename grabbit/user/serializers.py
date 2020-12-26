from lib.serializers import BaseModelSerializer
from user.models import User, Notification


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
            "current_session_token",
            "phone",
        ]


class NotificationSerializer(BaseModelSerializer):
    class Meta:
        model = Notification
        fields = ["id", "created_at", "updated_at", "deleted_at", "text", "expiry", "user"]