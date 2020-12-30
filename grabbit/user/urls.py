from django.urls import path, include, re_path
from rest_framework import routers
from user.views import UserViewSet, user_login, list_all_notifications, SettingViewSet, list_all_user_rewards, get_user_stats

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"settings", SettingViewSet, basename="setting")

urlpatterns = [
    path("", include(router.urls)),
    path(r"user/login/", user_login),
    re_path(r"user/(\d+)/rewards/", list_all_user_rewards),
    re_path(r"user/(\d+)/notifications/", list_all_notifications),
    re_path(r"user/(\d+)/stats/", get_user_stats),
]
