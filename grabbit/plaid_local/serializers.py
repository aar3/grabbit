from lib.serializers import BaseModelSerializer
from plaid_local.models import LinkToken, Link


class LinkTokenSerializer(BaseModelSerializer):
    class Meta:
        model = LinkToken
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "user_id",
            "token",
        ]


class LinkSerializer(BaseModelSerializer):
    class Meta:
        model = Link
        fields = [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "institution_name",
            "institution_id",
            "accounts",
            "public_token",
            "link_session_id",
        ]
