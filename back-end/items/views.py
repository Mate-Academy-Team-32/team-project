from django.db.models import Avg, Count
from django.db.models.functions import Round
from rest_framework import viewsets

from items.models import Item, ItemImage, Tag, Review
from items.serializers import (
    ItemSerializer,
    ItemListSerializer,
    ItemDetailSerializer,
    ItemImageSerializer,
    ItemImageDetailSerializer,
    TagSerializer,
    ReviewSerializer,
)


class CoreModelMixin:
    def perform_create(self, serializer, *args, **kwargs):
        return serializer.save(created_by=self.request.user, *args, **kwargs)


class ItemViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Item.objects.all()

    def get_queryset(self):
        queryset = self.queryset.annotate(
            rating_avg=(Round(Avg("reviews__rate"), 2)),
            rating_count=(Count("reviews")),
        )

        if self.action != "create":
            queryset.select_related("reviews", "item_images").prefetch_related("tags")

        return queryset

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer

        if self.action == "retrieve":
            return ItemDetailSerializer

        return ItemSerializer


class ItemImageViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = ItemImage.objects.all()
    serializer_class = ItemImageDetailSerializer


class TagViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ReviewViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
