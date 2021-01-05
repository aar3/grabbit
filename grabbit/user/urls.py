from django.urls import path, include, re_path
from rest_framework import routers
from user.views import (
    UserViewSet,
    user_login,
    list_all_user_rewards,
    list_all_user_notifications,
    set_notifications_as_seen,
    get_user_stats,
    SettingViewSet,
)

router = routers.DefaultRouter()
router.register(r"accounts", UserViewSet, basename="user")
router.register(r"(\d+)/settings", SettingViewSet, basename="setting")

urlpatterns = [
    path("users/", include(router.urls)),
    path("users/login/", user_login),
    re_path(r"users/(\d+)/rewards/", list_all_user_rewards),
    re_path(r"users/(\d+)/notifications/", list_all_user_notifications),
    re_path(r"users/(\d+)/stats/", get_user_stats),
]
