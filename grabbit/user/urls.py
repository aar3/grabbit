from django.urls import path, include, re_path
from rest_framework import routers

from user.views import UserViewSet, user_login, list_all_notifications

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path(r"user/login/", user_login),
    re_path(r"users/(\d+)/notifications/", list_all_notifications),
]
