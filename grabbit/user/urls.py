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
from plaid_local.views import LinkViewSet, LinkTokenViewSet, handle_link_auth_success
from deal.views import MatchedDealViewSet, WatchListViewSet

router = routers.DefaultRouter()
router.register(r"accounts", UserViewSet, basename="user")
router.register(r"^(?P<user_id>\w+)/settings", SettingViewSet, basename="setting")
router.register(r"^(?P<user_id>\w+)/deals", MatchedDealViewSet, basename="deal")
router.register(r"^(?P<user_id>\w+)/watchlist", WatchListViewSet, basename="watchlist")
router.register(r"^(?P<user_id>\w+)/notifications", NotificationViewSet, basename="notification")

plaid_router = routers.DefaultRouter()
plaid_router.register(r"links", LinkViewSet, basename="link")
plaid_router.register(r"link-tokens", LinkTokenViewSet, basename="link-token")

urlpatterns = [
    path("users/", include(router.urls)),
    path("users/login/", post_user_login),
    re_path(r"users/(?P<user_id>\w+)/stats/", get_user_stats),
    re_path(r"users/(?P<user_id>\w+)/get_and_set_notifications", get_notifications_and_set_as_seen),
    re_path(r"users/(?P<user_id>\w+)/plaid/", include(plaid_router.urls)),
    re_path(r"users/(?P<user_id>\w+)/plaid/link-token-success", handle_link_auth_success),
]
