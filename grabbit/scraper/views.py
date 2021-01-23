from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from lib.celery import nike_scraper_task, fenty_beauty_scraper_task
from lib.middlewares import ScraperAuthentication


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_nike_scraper_task(request):
    # nike_scraper_task.apply_async(request.data.get("start"))
    nike_scraper_task(request.data.get("start"))
    return Response(status=200, data={"details": "Starting Nike scraper"})


@api_view(["POST"])
@authentication_classes([ScraperAuthentication])
def init_target_fenty_beauty_scraper_task(request):
    # fenty_beauty_scraper_task.apply_async(request.data.get("start"))
    fenty_beauty_scraper_task(request.data.get("start"))
    return Response(status=200, data={"details": "Starting Target scraper"})
