from django.urls import path, include, re_path
from rest_framework import routers
from deals.views import DealViewSet

router = routers.DefaultRouter()
router.register(r"deals", DealViewSet, basename="deal")

urlpatterns = [
    path("", include(router.urls)),
]
