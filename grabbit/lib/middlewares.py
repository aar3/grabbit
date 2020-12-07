from django.shortcuts import get_object_or_404
from rest_framework import authentication
from rest_framework import exceptions
from user.models import User


class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get("HTTP_X_SESSION_TOKEN")
        if not token:
            raise exceptions.AuthenticationFailed("no token")
        user = get_object_or_404(User, current_session_token=token)
        if not user:
            raise exceptions.AuthenticationFailed("bad token")
        return (user, None)
