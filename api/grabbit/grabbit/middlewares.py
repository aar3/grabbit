from django.shortcuts import get_object_or_404
from rest_framework import authentication
from rest_framework import exceptions
from partners.models import User


class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get("HTTP_X_GRABBIT_TOKEN")
        if not token:
            raise exceptions.AuthenticationFailed("no token")
        user = get_object_or_404(User, session_token_key=token)
        if not user:
            raise exceptions.AuthenticationFailed("bad token")
        return (user, None)
