# pylint: disable=unused-argument
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, parser_classes
from rest_framework.parsers import MultiPartParser
from django.shortcuts import get_object_or_404
from django.utils import timezone
from user.models import User, Login, Notification, Setting
from user.serializers import UserSerializer, NotificationSerializer, SettingSerializer
from lib.middlewares import TokenAuthentication
from lib.views import BaseModelViewSet
from lib.utils import average, most_common
from lib.const import INVITATION_CODE


class UserViewSet(viewsets.ViewSet):
    model = User
    serializer = UserSerializer

    def list(self, request):
        raise NotImplementedError

    @authentication_classes([TokenAuthentication])
    def retrieve(self, request, pk=None):
        instance = get_object_or_404(self.model.objects.filter(pk=pk))
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def create(self, request):
        params = request.data
        code = params.get("invitation_code")
        if code != INVITATION_CODE:
            return Response(data={"details": "Invalid invitation code"}, status=403)

        instance = self.model.objects.filter(phone=params["phone"])
        if instance:
            return Response(status=400, data={"detail": "exists"})

        instance = self.model.objects.create(**params)
        serializer = self.serializer(instance)
        return Response(serializer.data)

    @authentication_classes([TokenAuthentication])
    def update(self, request, pk=None):
        instance = get_object_or_404(self.model, pk=pk)
        instance.__dict__.update(request.data)
        instance.save()
        serializer = self.serializer(instance)
        return Response(serializer.data)


class BaseUserNestedViewSet(BaseModelViewSet):
    def list(self, request, user_id=None):
        user = get_object_or_404(User, pk=user_id)
        links = self.model.objects.filter(user__id=user.id, deleted_at=None)
        serializer = self.serializer(links, many=True)
        return Response(serializer.data)

    def retrieve(self, request, user_id=None, pk=None):
        user = get_object_or_404(User, pk=user_id)
        instance = get_object_or_404(self.model, pk=pk, user__id=user.id, deleted_at=None)
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def create(self, request, user_id=None):
        params = request.data
        instance = self.model.objects.filter(**params)
        if instance:
            return Response(status=400, data={"detail": "exists"})
        instance = self.model.objects.create(**params)
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def update(self, request, user_id=None, pk=None):
        user = get_object_or_404(User, pk=user_id)
        instance = self.model.objects.get(user__id=user.id, pk=pk, deleted_at=None)
        instance.__dict__.update(request.data)
        instance.save()
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, user_id=None, pk=None):
        user = get_object_or_404(User, pk=user_id)
        instance = self.model.objects.filter(user__id=user.id, pk=pk, deleted_at=None)
        instance.delete()
        serializer = self.serializer(instance)
        return Response(serializer.data)


class NotificationViewSet(BaseUserNestedViewSet):
    model = Notification
    serializer = NotificationSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, user_id=None):
        user = get_object_or_404(User, pk=user_id)
        self.model.objects.filter(user__id=user.id, seen_at=None).update(seen_at=timezone.now())
        instances = self.model.objects.filter(user__id=user.id)
        serializer = self.serializer(instances, many=True)
        return Response(serializer.data)


@api_view(["POST"])
def post_user_login(request):
    remote_addr = request.META.get("REMOTE_ADDR")
    user_agent = request.META.get("HTTP_USER_AGENT")
    user = get_object_or_404(User, phone=request.data["phone"])

    if not user.matches_secret(request.data["secret"]):
        return Response(status=401)

    _ = Login.objects.create(ip_address=remote_addr, user=user, user_agent=user_agent)
    user.refresh_from_db()
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
def list_all_user_deals(request, pk=None):
    pass


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
def get_user_stats(request, pk=None):
    return Response(status=200)


class SettingViewSet(BaseUserNestedViewSet):
    model = Setting
    serializer = SettingSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, user_id=None):
        user = get_object_or_404(User, pk=user_id)
        # FIXME: There should never be more than a single setting per user
        settings = Setting.objects.filter(user__id=user.id).order_by("-created_at")[0]
        serializer = SettingSerializer(settings)
        return Response(serializer.data)
