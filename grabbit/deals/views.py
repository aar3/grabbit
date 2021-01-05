from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, api_view
from rest_framework.viewsets import ViewSet
from django.shortcuts import get_object_or_404
from lib.views import BaseModelViewSet
from user.models import User
from user.views import BaseUserNestedViewSet
from deals.models import Deal
from deals.serializers import DealSerializer
from lib.middlewares import TokenAuthentication


class DealViewSet(BaseUserNestedViewSet):
    model = Deal
    serializer = DealSerializer
    authentication_classes = [TokenAuthentication]
