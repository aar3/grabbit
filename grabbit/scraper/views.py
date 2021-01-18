from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from lib.celery import target_scraper_task, nike_scraper_task
from lib.middlewares import ScraperAuthentication


# @api_view(["POST"])
# @authentication_classes([ScraperAuthentication])
# def init_slickdeals_scraper_task(_):
#     slickdeals_scraper_task.apply_async()
#     return Response(status=200, data={"details": "Starting SlickDeals scraper"})


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_target_scraper_task(request):
    target_scraper_task.apply_async(request.data.get("start"))
    return Response(status=200, data={"details": "Starting Target scraper"})


# @api_view(["POST"])
# @authentication_classes([ScraperAuthentication])
# def init_amazon_scraper_task(request):
#     amazon_scraper_task.apply_async(request.data.get("start"))
#     return Response(status=200, data={"details": "Starting Amazon scraper"})


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_nike_scraper_task(request):
    # nike_scraper_task.apply_async(request.data.get("start"))
    nike_scraper_task(request.data.get("start"))
    return Response(status=200, data={"details": "Starting Nike scraper"})
