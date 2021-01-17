from django.urls import path, include, re_path
from scraper.views import init_target_scraper_task, init_nike_scraper_task

urlpatterns = [
    # path("scrapers/slickdeals/", init_slickdeals_scraper_task),
    path("scrapers/target/", init_target_scraper_task),
    # path("scrapers/amazon/", init_amazon_scraper_task),
    path("scrapers/nike/", init_nike_scraper_task),
]
