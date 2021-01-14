from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from lib.celery import slickdeals_scraper_task, target_scraper_task, amazon_scraper_task
from lib.middlewares import ScraperAuthentication


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_slickdeals_scraper_task(_):
    slickdeals_scraper_task.apply_async()
    return Response(status=200, data={"details": "Starting SlickDeals scraper"})


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_target_scraper_task(_):
    target_scraper_task.apply_async()
    return Response(status=200, data={"details": "Starting Target scraper"})


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_amazon_scraper_task(_):
    amazon_scraper_task()
    return Response(status=200, data={"details": "Starting Amazon scraper"})
