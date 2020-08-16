# pylint: disable=unused-argument

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes
from django.shortcuts import get_object_or_404

from partners.models import *
from partners.serializers import *
from grabbit.middlewares import TokenAuthentication


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
        instance = self.model.objects.filter(**params)
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


class ProductViewSet(BaseModelViewSet):
    model = Product
    serializer = ProductSerializer


class NotificationViewSet(BaseModelViewSet):
    model = Notification
    serializer = NotificationSerializer


class OfferViewSet(BaseModelViewSet):
    model = Offer
    serializer = OfferSerializer


class LikeViewSet(BaseModelViewSet):
    model = Like
    serializer = LikeSerializer


class MatchViewSet(BaseModelViewSet):
    model = Match
    serializer = MatchSerializer


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


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
def UserExploreView(request, pk=None):
    _ = get_object_or_404(User, pk=pk)

    # TODO: use chronological ordering of recommended merchants products/services
    products = Product.objects.filter("-created_at")[:10]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
def UploadImageView(request, pk=None):
    params = request.data
    user = get_object_or_404(User, pk=pk)
    
    # TODO: verify photo, format, and send to gcloud (create task)
    # return full url from gcloud and store it in user instance


@api_view(["POST"])
def InterestView(request):
    params = request.data
    interest = Interest.objects.create(email=params["email"])
    serializer = InterestSerializer(interest)
    return Response(serializer.data)
