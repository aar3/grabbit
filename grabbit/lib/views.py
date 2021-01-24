# pylint: disable=unused-argument
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, parser_classes
from rest_framework.parsers import MultiPartParser
from django.shortcuts import get_object_or_404

from lib.models import BaseModel
from lib.middlewares import TokenAuthentication

PAGE_SIZE = 10


class BaseAPIView(APIView):
    pass


class BaseModelViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    model = BaseModel

    def list(self, request):
        params = request.query_params.dict()

        # FIXME: ideally we woudn't copy this around
        page = params.get("page")
        if page:
            page = int(page)
            del params["page"]

        qs = self.model.objects.filter(**params, deleted_at=None)
        qs = self._paginated_queryset(qs, page=page)
        serializer = self.serializer(qs, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
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
        serializer = self.serializer(instance)
        instance.soft_delete()
        return Response(serializer.data)

    def _paginated_queryset(self, queryset, page):
        start, end = self._page_indices(page)
        if not end:
            return queryset
        return queryset[start:end]

    def _page_indices(self, page=None):
        page_size = 10
        start = 0
        end = None
        if page is not None:
            print("PAGINATING")
            start = page_size * (page - 1)
            end = start + page_size
        print(start, end)
        return start, end
