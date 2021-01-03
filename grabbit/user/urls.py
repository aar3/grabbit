from django.urls import path, include, re_path
from rest_framework import routers
from user.views import (
    UserViewSet,
    user_login,
    SettingViewSet,
    NotificationViewSet,
    list_all_user_rewards,
    get_user_stats,
    SettingViewSet,
)

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"user/(\d+)/settings", SettingViewSet, basename="setting")
router.register(r"user/(\d+)/notifications", NotificationViewSet, basename="notification")

urlpatterns = [
    path("", include(router.urls)),
    path(r"user/login/", user_login),
    re_path(r"user/(\d+)/rewards/", list_all_user_rewards),
    re_path(r"user/(\d+)/stats/", get_user_stats),
]
