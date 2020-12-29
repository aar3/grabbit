from django.urls import path, include, re_path
from rest_framework import routers
from plaid_local.views import LinkTokenViewSet, handle_link_auth_success, process_user_transactions, LinkViewSet

router = routers.DefaultRouter()
router.register(r"link-tokens", LinkTokenViewSet, basename="link-token")
router.register(r"(\d+)/links", LinkViewSet, basename="link")

urlpatterns = [
    path("plaid/", include(router.urls)),
    re_path(r"plaid/(\d+)/link-token-success/", handle_link_auth_success),
    re_path(r"plaid/(\d+)/transactions/", process_user_transactions),
]
