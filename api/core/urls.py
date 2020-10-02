from django.urls import path, include, re_path
from rest_framework import routers

from core.views import *


router = routers.DefaultRouter()
router.register(r"products", ProductViewSet, basename="Product")
router.register(r"users", UserViewSet, basename="User")
router.register(r"notifications", NotificationViewSet, basename="Notification")

urlpatterns = [
    path("", include(router.urls)),
    path(r"login/", LoginView),
    re_path(r"explore/brokers/(\d+)", BrokerExploreView),
    re_path(r"explore/merchants/(\d+)", MerchantExploreView),
    re_path(r"history/brokers/(\d+)", BrokerHistoryView),
    re_path(r"users/(\d+)/conversations", ConversationsView),
]
