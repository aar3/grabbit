import json
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import authentication
from rest_framework import exceptions
from user.models import User
from lib.local_redis import get_redis_instance


redis = get_redis_instance(host=settings.REDIS_HOST, port=settings.REDIS_DEFAULT_PORT)


def path_user_matches_token_user(path, user_id):
    path_parts = path.split("/")
    if not "users" in path_parts:
        return True
    index = path_parts.index("users") + 1
    return int(path_parts[index]) == user_id


class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get("HTTP_X_SESSION_TOKEN")
        if not token:
            raise exceptions.AuthenticationFailed("no token")
        # FIXME: how slow this gonna be guy? <('-'<)
        user = json.loads(redis.get(token).decode())
        if not user:
            raise exceptions.AuthenticationFailed("bad token")
        if not path_user_matches_token_user(request.path, user["id"]):
            raise exceptions.AuthenticationFailed("bad path")
        return (user, None)


class ScraperAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get("HTTP_X_SCRAPER_TOKEN")
        if not token or token != settings.ENGINEERING_USER_MASTER_TOKEN:
            raise exceptions.AuthenticationFailed("no token")
        user = redis.get(token)
        if not user:
            raise exceptions.AuthenticationFailed("bad token")
        return (user, None)
