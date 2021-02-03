from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, api_view
from rest_framework.viewsets import ViewSet
from django.shortcuts import get_object_or_404
from lib.views import BaseModelViewSet
from lib.middlewares import TokenAuthentication
from user.models import User
from user.views import BaseUserNestedViewSet
from deal.models import Deal, MatchedDeal, WatchList, Like, Brand, FollowedBrand
from deal.serializers import (
    DealSerializer,
    MatchedDealserializer,
    WatchListSerializer,
    LikeSerializer,
    BrandSerializer,
    FollowedBrandSerializer,
)


class MatchedDealViewSet(BaseUserNestedViewSet):
    model = MatchedDeal
    serializer = MatchedDealserializer
    authentication_classes = [TokenAuthentication]


class DealViewSet(BaseModelViewSet):
    model = Deal
    serializer = DealSerializer
    authentication_classes = [TokenAuthentication]


class WatchListViewSet(BaseUserNestedViewSet):
    model = WatchList
    serializer = WatchListSerializer
    authentication_classes = [TokenAuthentication]


class LikeViewSet(BaseUserNestedViewSet):
    model = Like
    serializer = LikeSerializer
    authentication_classes = [TokenAuthentication]


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
def get_all_brands(request):
    instances = Brand.objects.filter(deleted_at=None)
    serializer = BrandSerializer(instances, many=True)
    return Response(serializer.data)


class FollowedBrandViewSet(BaseUserNestedViewSet):
    model = FollowedBrand
    serializer = FollowedBrandSerializer
    authentication_classes = [TokenAuthentication]
