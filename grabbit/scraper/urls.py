from django.urls import path, include, re_path
from scraper.views import init_slickdeals_scraper, init_target_scraper

urlpatterns = [
    path("scrapers/slickdeals/", init_slickdeals_scraper),
    path("scrapers/target/", init_target_scraper),
]
