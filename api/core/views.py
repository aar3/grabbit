# pylint: disable=unused-argument
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, parser_classes
from rest_framework.parsers import MultiPartParser
from django.shortcuts import get_object_or_404

from core.models import *
from core.serializers import *
from lib.gcloud import GoogleCloudService
from lib.middlewares import TokenAuthentication


class BaseAPIView(APIView):
    pass


class BaseModelViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    model = BaseModel
    serializer = BaseModelSerializer

    def list(self, request):
        params = request.query_params.dict()
        queryset = self.model.objects.filter(**params)
        serializer = self.serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        instance = get_object_or_404(self.model.objects.filter(pk=pk))
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def create(self, request):
        params = request.data
        instance = self.model.objects.filter(**params)
        if instance:
            return Response(status=400, data={"detail": "exists"})
        instance = self.model.objects.create(**params)
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def update(self, request, pk=None):
        instance = get_object_or_404(self.model.objects.filter(pk=pk))
        instance.__dict__.update(request.data)
        instance.save()

        serializer = self.serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        instance = get_object_or_404(self.model.objects.filter(pk=pk))
        instance.__dict__.update(request.data)
        instance.save()

        serializer = self.serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(self.model.objects.filter(pk=pk))
        instance.delete()
        return Response(status=200)


class UserViewSet(viewsets.ViewSet):
    model = User
    serializer = UserSerializer

    @authentication_classes([TokenAuthentication])
    def retrieve(self, request, pk=None):
        instance = get_object_or_404(self.model.objects.filter(pk=pk))
        serializer = self.serializer(instance)
        return Response(serializer.data)

    def create(self, request):
        params = request.data
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


class CampgaignCodeViewSet(BaseModelViewSet):
    model = CampaignCode
    serializer = CampaignCodeSerializer


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
def BrokerDiscoverView(request, pk=None):
    # TODO: this is ok for now but will need to be updated later
    _ = get_object_or_404(User, pk=pk)
    brands_data = Brand.objects.all().values()

    augmented_data = []

    # without a custom serializer for this we have to manually
    # augment the brand's with only their latest campaign codes
    for brand_data in brands_data:
        latest_campaign_code = (
            CampaignCode.objects.filter(brand__id=brand_data["id"]).order_by("-created_at")[:1].values()
        )
        brand_data["latest_campaign_code"] = latest_campaign_code[0] if latest_campaign_code else None
        augmented_data.append(brand_data)

    featured_row0 = augmented_data[:3]
    featured_row1 = augmented_data[3:6]

    # TODO: add custom serializer for this
    return Response({"featured": {"row0": featured_row0, "row1": featured_row1,}, "all": augmented_data})


class NotificationViewSet(BaseModelViewSet):
    model = Notification
    serializer = NotificationSerializer

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)

        instances = self.model.objects.filter(user__id=user.id)
        serializer = self.serializer(instances, many=True)
        return Response(serializer.data)


@api_view(["POST"])
def LoginView(request):
    params = request.data
    remote_addr = request.META.get("REMOTE_ADDR")
    user = get_object_or_404(User, email=params["email"])

    if not user.matches_secret(params["secret"]):
        return Response(status=401)

    _ = Login.objects.create(ip_address=remote_addr, user=user)
    user.refresh_from_db()
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@parser_classes([MultiPartParser])
def UploadBrandImageView2(request, pk=None):
    # TODO: authenticate and verify image
    brand = get_object_or_404(Brand, pk=pk)
    file_obj = request.data["file"]
    user_id = request.data["user_id"]

    user = get_object_or_404(User, pk=user_id)

    GoogleCloudService.upload_brand_image_to_bucket(user.email, brand.slug, "some-image.jpg", file_obj)
    return Response(status=204)


class BrandViewSet(BaseModelViewSet):
    model = Brand
    serializer = BrandSerializer


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
def WalletBrandView(request, pk=None):
    wallet = get_object_or_404(Wallet, user__id=pk)
    items = WalletBrand.objects.filter(wallet__id=wallet.id)
    serializer = WalletBrandListViewSerializer({"wallet": wallet, "wallet_brands": items})
    return Response(serializer.data)
