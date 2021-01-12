from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from lib.tasks import slickdeals_scraper, target_scraper
from lib.middlewares import ScraperAuthentication


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_slickdeals_scraper(_):
    slickdeals_scraper.apply_async()
    return Response(status=200, data={"details": "Starting SlickDeals scraper"})


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_target_scraper(_):
    target_scraper.apply_async()
    return Response(status=200, data={"details": "Starting Target scraper"})
