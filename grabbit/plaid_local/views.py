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
from grabbit.config import config
from plaid_local.models import LinkToken, Link
from plaid_local.tasks import scrape_transactions_for_user
from plaid_local.serializers import LinkTokenSerializer, LinkSerializer
from plaid_local import PlaidClient


class LinkTokenViewSet(BaseModelViewSet):
    model = LinkToken
    serializer = LinkTokenSerializer
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        user = get_object_or_404(User, phone=request.data["user_id"])
        configs = {
            "user": {"client_user_id": request.data["user_id"],},
            "products": ["auth", "transactions"],
            "client_name": config.NAME,
            "country_codes": ["US"],
            "language": "en",
            # "webhook": config.PLAID.CREATE_LINK_WEBHOOK,
            "link_customization_name": "default",
            "account_filters": {"depository": {"account_subtypes": ["checking", "savings"],},},
        }

        response = PlaidClient.LinkToken.create(configs)
        instance = self.model.objects.create(token=response["link_token"], user=user)
        serializer = self.serializer(instance)

        return Response(serializer.data)


class LinkViewSet(BaseModelViewSet):
    model = Link
    serializer = LinkSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        links = self.model.objects.filter(user__id=user.id)
        serializer = self.serializer(links, many=True)
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


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
def process_user_transactions(request, pk=None):
    user = get_object_or_404(User, pk=pk)
    start_date = dt.datetime.strptime(request.data["start_date"], PLAID_DATE_FORMAT)
    end_date = dt.datetime.strptime(request.data["end_date"], PLAID_DATE_FORMAT)
    _ = scrape_transactions_for_user.apply_async(args=(user.id, start_date, end_date))
    # scrape_transactions_for_user(user.id, start_date, end_date)
    return Response(data={"details": "ok"}, status=200)
