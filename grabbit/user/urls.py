from django.urls import path, include, re_path
from rest_framework import routers
from user.views import (
    UserViewSet,
    SettingViewSet,
    NotificationViewSet,
    post_user_login,
    get_user_stats,
    get_notifications_and_set_as_seen,
)
from deal.views import MatchedDealViewSet, WatchListViewSet, LikeViewSet, FollowedBrandViewSet

router = routers.DefaultRouter()
router.register(r"accounts", UserViewSet, basename="user")
router.register(r"^(?P<user_id>\w+)/settings", SettingViewSet, basename="setting")
router.register(r"^(?P<user_id>\w+)/deals", MatchedDealViewSet, basename="deal")
router.register(r"^(?P<user_id>\w+)/watchlist", WatchListViewSet, basename="watchlist")
router.register(r"^(?P<user_id>\w+)/likes", LikeViewSet, basename="like")
router.register(r"^(?P<user_id>\w+)/notifications", NotificationViewSet, basename="notification")
router.register(r"^(?P<user_id>\w+)/brands", FollowedBrandViewSet, basename="followed-brand")

urlpatterns = [
    path("users/", include(router.urls)),
    path("users/login/", post_user_login),
    re_path(r"users/(?P<user_id>\w+)/stats/", get_user_stats),
    re_path(r"users/(?P<user_id>\w+)/get_and_set_notifications", get_notifications_and_set_as_seen),
]

