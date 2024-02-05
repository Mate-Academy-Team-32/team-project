from django.db.models import Avg, Count
from django.db.models.functions import Round
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.permissions import IsOwnerOrReadCreate
from items.models import Item, ItemImage, Tag, Review
from items.serializers import (
    ItemSerializer,
    ItemListSerializer,
    ItemDetailSerializer,
    ItemImageDetailSerializer,
    TagSerializer,
    ReviewSerializer,
)


class CoreModelMixin:
    def perform_create(self, serializer, *args, **kwargs):
        return serializer.save(created_by=self.request.user, *args, **kwargs)


class ItemViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Item.objects.all()

    def filter_queryset(self, queryset):
        query_params = [
            "label", "gender", "strength",
            "size", "country", "tags",
        ]

        for param in query_params:
            val = self.request.query_params.getlist(param)
            print(f"Parameter: {param}, Values: {val}")

            if val:
                filter_kwargs = {f"{param}__in": val}
                queryset = queryset.filter(**filter_kwargs)

        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")

        if min_price:
            queryset = queryset.filter(price__gt=min_price)

        if max_price:
            queryset = queryset.filter(price__lt=max_price)

        return queryset

    def get_queryset(self):
        queryset = self.queryset.annotate(
            rating_avg=(Round(Avg("reviews__rate"), 2)),
            rating_count=(Count("reviews")),
        )

        queryset = self.filter_queryset(queryset)

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
    permission_classes = [
        IsOwnerOrReadCreate,
        IsAuthenticatedOrReadOnly,
    ]