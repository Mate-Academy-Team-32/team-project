from django.db.models import Avg, Count
from rest_framework import viewsets

from items.models import Item
from items.serializers import (
    ItemSerializer,
    ItemListSerializer,
    ItemDetailSerializer,
)


class CoreModelMixin:
    def perform_create(self, serializer, *args, **kwargs):
        return serializer.save(created_by=self.request.user, *args, **kwargs)


class ItemViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Item.objects.all()

    def get_queryset(self):
        queryset = self.queryset.annotate(
            rating_avg=(Avg("reviews__rate")),
            rating_count=(Count("reviews")),
        )

        if self.action != "create":
            queryset.select_related("reviews").prefetch_related("tags")

        return queryset

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer

        if self.action == "retrieve":
            return ItemDetailSerializer

        return ItemSerializer
