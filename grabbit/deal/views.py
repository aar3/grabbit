from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, api_view
from rest_framework.viewsets import ViewSet
from django.shortcuts import get_object_or_404
from lib.views import BaseModelViewSet
from lib.const import Scrapers
from lib.middlewares import TokenAuthentication
from user.models import User
from user.views import BaseUserNestedViewSet
from deal.models import Deal, UserDeal, WatchList
from deal.serializers import DealSerializer, UserDealSerializer, WatchListSerializer


class UserDealViewSet(BaseUserNestedViewSet):
    model = UserDeal
    serializer = UserDealSerializer
    authentication_classes = [TokenAuthentication]


class DealViewSet(BaseModelViewSet):
    model = Deal
    serializer = DealSerializer
    authentication_classes = [TokenAuthentication]


class WatchListViewSet(BaseUserNestedViewSet):
    model = WatchList
    serializer = WatchListSerializer
    authentication_classes = [TokenAuthentication]
