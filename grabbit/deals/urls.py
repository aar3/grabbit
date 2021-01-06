from django.urls import path, include, re_path
from rest_framework import routers
from deals.views import DealViewSet, init_slickdeals_scraper

router = routers.DefaultRouter()
router.register(r"deals", DealViewSet, basename="deal")

urlpatterns = [
    path("", include(router.urls)),
    path("scrape/", init_slickdeals_scraper),
]
