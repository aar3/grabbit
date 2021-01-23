from django.urls import path, include, re_path
from scraper.views import init_nike_scraper_task, init_target_fenty_beauty_scraper_task

urlpatterns = [
    path("scrapers/nike/", init_nike_scraper_task),
    path("scrapers/fentybeauty/", init_target_fenty_beauty_scraper_task),
]
