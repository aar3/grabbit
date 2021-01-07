from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, api_view
from rest_framework.viewsets import ViewSet
from django.shortcuts import get_object_or_404
from lib.views import BaseModelViewSet
from lib.const import Scrapers
from lib.tasks import task_manager, execute_scrape_tasks, SlickDealsScraper
from lib.middlewares import TokenAuthentication
from user.models import User
from user.views import BaseUserNestedViewSet
from deals.models import UserDeal, Deal
from deals.serializers import DealSerializer, UserDealSerializer


class UserDealViewSet(BaseUserNestedViewSet):
    model = UserDeal
    serializer = UserDealSerializer
    authentication_classes = [TokenAuthentication]


class DealViewSet(BaseModelViewSet):
    model = Deal
    serializer = DealSerializer
    authentication_classes = [TokenAuthentication]


@api_view(["POST"])
def init_slickdeals_scraper(request):
    if request.data["scraper"] == Scrapers.SlickDeals:
        execute_scrape_tasks.apply_async()
    return Response(status=200, data={"details": "Starting scrape tasks"})
