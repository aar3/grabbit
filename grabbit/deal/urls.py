from django.urls import path, include, re_path
from rest_framework import routers
from deal.views import DealViewSet, get_all_brands

router = routers.DefaultRouter()
router.register(r"deals", DealViewSet, basename="deal")

urlpatterns = [
    path("", include(router.urls)),
    path(r"brands/", get_all_brands),
]
