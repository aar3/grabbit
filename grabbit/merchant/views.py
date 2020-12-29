# pylint: disable=unused-argument

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from django.shortcuts import get_object_or_404
from lib.views import BaseModelViewSet
from lib.middlewares import TokenAuthentication
from merchant.models import Merchant, Reward, Campaign, RewardCode
from merchant.serializers import MerchantSerializer, RewardSerializer, CampaignSerializer, RewardCodeSerializer
from user.models import User


class MerchantViewSet(BaseModelViewSet):
    model = Merchant
    serializer = MerchantSerializer
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        params = request.data
        instance = self.model.objects.filter(**params)
        if instance:
            return Response(status=400, data={"detail": "exists"})
        instance = self.model.objects.create(**params)
        acting_user = User.objects.get(current_session_token=request.META["HTTP_X_SESSION_TOKEN"])
        instance.users.add(acting_user)
        instance.save()
        serializer = self.serializer(instance)
        return Response(serializer.data)


class CampaignViewSet(BaseModelViewSet):
    model = Campaign
    serializer = CampaignSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, pk=None):
        merchant = get_object_or_404(Merchant, pk=pk)
        instances = self.model.objects.filter(merchant__id=merchant.id)
        serializer = self.serializer(instances, many=True)
        return Response(serializer.data)

    def create(self, request, pk=None):

        create_params = request.data.copy()

        del create_params["created_by_user_id"]

        merchant = get_object_or_404(Merchant, pk=pk)
        create_params["merchant"] = merchant
        user = get_object_or_404(User, pk=request.data["created_by_user_id"])
        create_params["created_by_user"] = user
        instance = self.model.objects.create(**create_params)
        serializer = self.serializer(instance)
        return Response(serializer.data)


class RewardCodeViewSet(BaseModelViewSet):
    model = RewardCode
    serializer = RewardCodeSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, merchant_id=None):
        _ = get_object_or_404(Merchant, pk=merchant_id)
        instances = self.model.objects.filter(merchant__id=merchant_id)
        serializer = self.serializer(instances, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args):
        _ = get_object_or_404(Merchant, pk=pk)
        instance = get_object_or_404(RewardCode, pk=1)
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def create(self, request, merchant_id=None):
        _ = get_object_or_404(Merchant, pk=merchant_id)
        instance = self.model.objects.create(**request.data)
        serializer = self.serializer(instance)
        return Response(serializer.data)


class RewardViewSet(BaseModelViewSet):
    model = Reward
    serializer = RewardSerializer
    authentication_classes = [TokenAuthentication]

    def list(self, request, merchant_id=None, campaign_id=None):
        campaign = get_object_or_404(Campaign, pk=campaign_id)
        instances = self.model.objects.filter(campaign__id=campaign.id)
        serializer = self.serializer(instances, many=True)
        return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
def redeem_campaign_reward(request, code=None):
    reward = get_object_or_404(Reward, code=code)
    data = {"details": "redeemed"}
    if reward.campaign.is_active() and not reward.is_expired():
        reward.redeem()
    else:
        data["details"] = "not redeemed"
    return Response(data=data, status=200)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
def activate_merchant_campaign(request, merchant_id=None, campaign_id=None):
    campaign = get_object_or_404(Campaign, pk=campaign_id)
    user_id = request.data["activated_by_user_id"]
    user = get_object_or_404(User, pk=user_id)
    campaign.activate(user)
    return Response(data={"details": "activated"})


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
def add_user_to_merchant_account(request, pk=None):
    merchant = get_object_or_404(Merchant, pk=pk)
    user_ids = [user.id for user in merchant.users.all()]
    for user_id in request.data["user_ids"]:
        user = User.objects.get(pk=user_id)
        if user and user.id not in user_ids:
            merchant.users.add(user)

    merchant.save()
    serializer = MerchantSerializer(merchant)
    return Response(serializer.data)
