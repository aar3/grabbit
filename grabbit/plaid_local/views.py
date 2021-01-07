import datetime as dt
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from lib.views import BaseModelViewSet
from lib.middlewares import TokenAuthentication
from lib.const import PLAID_DATE_FORMAT
from user.models import User
from user.views import BaseUserNestedViewSet
from grabbit.config import config
from plaid_local.models import LinkToken, Link
from plaid_local.tasks import scrape_transactions_for_user
from plaid_local.serializers import LinkTokenSerializer, LinkSerializer
from plaid_local import PlaidClient


class LinkTokenViewSet(BaseUserNestedViewSet):
    model = LinkToken
    serializer = LinkTokenSerializer
    authentication_classes = [TokenAuthentication]

    def create(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        configs = {
            "user": {"client_user_id": user_id},
            "products": ["auth", "transactions"],
            "client_name": config.NAME,
            "country_codes": ["US"],
            "language": "en",
            "link_customization_name": "default",
            "account_filters": {"depository": {"account_subtypes": ["checking", "savings"],},},
        }

        response = PlaidClient.LinkToken.create(configs)
        instance = self.model.objects.create(token=response["link_token"], user=user)
        serializer = self.serializer(instance)

        return Response(serializer.data)


class LinkViewSet(BaseUserNestedViewSet):
    model = Link
    serializer = LinkSerializer
    authentication_classes = [TokenAuthentication]

    def update(self, request, pk=None, user_id=None):
        _ = get_object_or_404(User, pk=user_id)
        instance = get_object_or_404(self.model, pk=pk)
        instance.__dict__.update(request.data)
        instance.save()

        serializer = self.serializer(instance)
        return Response(serializer.data)

@csrf_exempt
@api_view(["POST"])
@authentication_classes([TokenAuthentication])
def handle_link_auth_success(request, pk=None):
    user = get_object_or_404(User, pk=pk)
    public_token = request.data["public_token"]
    institution_name = request.data["metadata"]["institution"]["institution_name"]
    institution_id = request.data["metadata"]["institution"]["institution_id"]
    accounts = request.data["metadata"]["accounts"]
    link_session_id = request.data["metadata"]["link_session_id"]

    response = PlaidClient.Item.public_token.exchange(public_token)
    access_token = response["access_token"]
    item_id = response["item_id"]

    instance = Link.objects.create(
        public_token=public_token,
        institution_name=institution_name,
        institution_id=institution_id,
        accounts=accounts,
        access_token=access_token,
        item_id=item_id,
        user=user,
        link_session_id=link_session_id,
    )

    serializer = LinkSerializer(instance)
    return Response(serializer.data)
