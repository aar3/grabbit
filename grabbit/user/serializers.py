from lib.serializers import BaseModelSerializer
from user.models import User, Notification, Setting


class UserSerializer(BaseModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "email",
            "current_session_token",
            "phone",
        ]


class NotificationSerializer(BaseModelSerializer):
    class Meta:
        model = Notification
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "text",
            "title",
            "expiry",
            "user_id",
            "route_key",
            "icon",
            "seen_at",
        ]


class SettingSerializer(BaseModelSerializer):
    class Meta:
        model = Setting
        fields = ["id", "created_at", "updated_at", "deleted_at", "user_id", "keywords", "targeting_enabled"]
