from django.urls import path, include, re_path
from rest_framework import routers
from deals.views import DealViewSet, init_slickdeals_scraper, init_target_scraper

router = routers.DefaultRouter()
router.register(r"deals", DealViewSet, basename="deal")

urlpatterns = [
    path("", include(router.urls)),
    path("scrape/slickdeals.net", init_slickdeals_scraper),
    path("scrape/target.com", init_target_scraper),
]
