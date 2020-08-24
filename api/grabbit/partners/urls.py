from django.urls import path, include, re_path
from rest_framework import routers

from partners.views import *


router = routers.DefaultRouter()
router.register(r"products", ProductViewSet, basename="Product")
router.register(r"users", UserViewSet, basename="User")
router.register(r"notifications", NotificationViewSet, basename="Notification")
router.register(r"likes", LikeViewSet, basename="Like")

urlpatterns = [
    path("", include(router.urls)),
    path(r"login/", LoginView),
    path(r"interest/", InterestView),
]
