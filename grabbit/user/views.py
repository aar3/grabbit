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
from merchant.models import Reward
from merchant.serializers import RewardSerializer
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
        print(">>> params: ", params)
        code = params.get("invitation_code")
        if code != INVITATION_CODE:
            return Response(data={"details": "Invalid invitation code"}, status=403)

        instance = self.model.objects.filter(email=params["email"])
        if instance:
            return Response(status=400, data={"detail": "exists"})
        instance = self.model.objects.create(**params)
        serializer = self.serializer(instance)
        return Response(serializer.data)

    @authentication_classes([TokenAuthentication])
    def update(self, request, pk=None):
        instance = get_object_or_404(self.model.objects.filter(pk=pk))
        instance.__dict__.update(request.data)
        instance.save()

        serializer = self.serializer(instance)
        return Response(serializer.data)


@api_view(["POST"])
def user_login(request):
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
def list_all_user_rewards(request, pk=None):
    user = get_object_or_404(User, pk=pk)
    rewards = Reward.objects.filter(owner_user__id=user.id)
    serializer = RewardSerializer(rewards, many=True)
    return Response(serializer.data)


class SettingViewSet(BaseModelViewSet):
    model = Setting
    serializers = SettingSerializer


class NotificationViewSet(BaseModelViewSet):
    model = Notification
    serializer = NotificationSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        notifications = self.model.objects.filter(user__id=user.id)
        serializer = self.serializer(notifications, many=True)
        return Response(serializer.data)

    # FIXME: we only need to update and return items that have seen_at=None, and the reducer
    # on the client needs to know that the incoming update operation is an "inplace" and not
    # a "replace"
    def create(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        notifications = self.model.objects.filter(user__id=user.id)
        for notification in notifications:
            notification.seen_at = timezone.now()

        self.model.objects.bulk_update(notifications, fields=["seen_at"])
        instances = self.model.objects.filter(user__id=user.id)
        serializer = self.serializer(instances, many=True)
        return Response(serializer.data)


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
def get_user_stats(request, pk=None):

    from merchant.models import Merchant
    from merchant.serializers import MerchantSerializer

    user = get_object_or_404(User, pk=pk)
    rewards = Reward.objects.filter(owner_user__id=user.id, is_active=False)
    unique_merchants = set([reward.code.campaign.merchant.id for reward in rewards])
    stats = {}

    if unique_merchants:
        mid = most_common(unique_merchants)
        instance = Merchant.objects.get(pk=mid)
        top_merchant = MerchantSerializer(instance).data

        stats = {
            # IMPORTANT: We have to get some of this data from the merchant integration
            "total_spend": 0,
            "avg_discount": average([reward.code.value for reward in rewards]),
            "time_elapsed": 30,
            "conversions": len([reward for reward in rewards if reward.redeemed_at]),
            "impressions": len(rewards),
            "unique_merchants": len(unique_merchants),
            "top_merchant": top_merchant,
            "missed_opportunities": {
                "expiries": len([reward.__dict__ for reward in rewards if not reward.redeemed_at]),
                "time_elapsed": 30,
                "potential_spend": 0,
                "avg_discount": average([reward.code.value for reward in rewards if not reward.redeemed_at]),
            },
        }

        stats["top_merchant"]["total_spend"] = 0
        stats["top_merchant"]["avg_discount"] = average(
            [reward.code.value for reward in rewards if reward.redeemed_at and reward.code.campaign.merchant.id == mid]
        )
        stats["top_merchant"]["conversions"] = len(
            [reward for reward in rewards if reward.code.campaign.merchant.id == mid]
        )

    return Response(data=stats)


class SettingViewSet(BaseModelViewSet):
    model = Setting
    serializer = SettingSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        settings = Setting.objects.filter(user__id=user.id).order_by("-created_at")[0]
        serializer = SettingSerializer(settings)
        return Response(serializer.data)
