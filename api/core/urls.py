from django.urls import path, include, re_path
from rest_framework import routers

from core.views import *


router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="User")
router.register(r"brands", BrandViewSet, basename="Brand")
router.register(r"campaign_codes", CampgaignCodeViewSet, basename="Campaign Code")
router.register(r"notifications", NotificationViewSet, basename="Notification")

urlpatterns = [
    path("", include(router.urls)),
    path(r"login/", LoginView),
    re_path(r"discover/(\d+)", BrokerDiscoverView),
    re_path(r"wallet-brands/(\d+)", WalletBrandView),
]
