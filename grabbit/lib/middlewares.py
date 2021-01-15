from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import authentication
from rest_framework import exceptions
from user.models import User
from lib.local_redis import Redis


class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get("HTTP_X_SESSION_TOKEN")
        if not token:
            raise exceptions.AuthenticationFailed("no token")
        user = Redis.get(token)
        if not user:
            raise exceptions.AuthenticationFailed("bad token")
        return (user, None)


class ScraperAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get("HTTP_X_SCRAPER_TOKEN")
        if not token or token != settings.ENGINEERING_USER_MASTER_TOKEN:
            raise exceptions.AuthenticationFailed("no token")
        user = Redis.get(token)
        if not user:
            raise exceptions.AuthenticationFailed("bad token")
        return (user, None)
