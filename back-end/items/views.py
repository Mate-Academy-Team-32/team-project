from django.db.models import Avg, Count
from django.db.models.functions import Round
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.permissions import IsOwnerOrReadCreate
from items.models import Item, ItemImage, Tag, Review, Brand, StockItem, Note
from items.serializers import (
    ItemSerializer,
    ItemListSerializer,
    ItemDetailSerializer,
    ItemImageDetailSerializer,
    TagSerializer,
    ReviewSerializer,
    BrandSerializer,
    StockItemSerializer,
    NoteSerializer,
    StockItemListSerializer,
    StockItemDetailSerializer,
)


class CoreModelMixin:
    def perform_create(self, serializer, *args, **kwargs):
        return serializer.save(created_by=self.request.user, *args, **kwargs)


class ItemViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Item.objects.all()

    def filter_queryset(self, queryset):
        query_params = [
            "brand",
            "gender",
            "strength",
            "country",
            "tags",
        ]

        for param in query_params:
            val = self.request.query_params.getlist(param)
            print(f"Parameter: {param}, Values: {val}")

            if val:
                filter_kwargs = (
                    {"brand__label__in": val}
                    if param == "brand"
                    else {f"{param}__in": val}
                )
                queryset = queryset.filter(**filter_kwargs)

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

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name,
                type=type_,
                description=f"Filter by {name} (ex. ?{name}={example})",
            )
            for name, type_, example in [
                ("brand", OpenApiTypes.STR, "Chanel"),
                ("country", OpenApiTypes.STR, "France"),
                ("strength", OpenApiTypes.INT, 2),
                ("gender", OpenApiTypes.STR, "F"),
                ("tags", OpenApiTypes.INT, 2),
            ]
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class StockItemPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"


class StockItemViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    pagination_class = StockItemPagination

    def filter_queryset(self, queryset):
        query_params = [
            "volume",
            "item_id",
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
        queryset = self.queryset

        if self.action != "create":
            queryset.select_related("item")

        return self.filter_queryset(queryset)

    def get_serializer_class(self):
        if self.action == "list":
            return StockItemListSerializer

        if self.action == "retrieve":
            return StockItemDetailSerializer

        return StockItemSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name,
                type=type_,
                description=f"Filter by {name} (ex. ?{name}={example})",
            )
            for name, type_, example in [
                ("min_price", OpenApiTypes.DECIMAL, 100),
                ("max_price", OpenApiTypes.DECIMAL, 100),
                ("volume", OpenApiTypes.INT, 250),
                ("item_id", OpenApiTypes.INT, 250),
            ]
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ItemImageViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = ItemImage.objects.all()
    serializer_class = ItemImageDetailSerializer


class TagViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class NoteViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class BrandViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class ReviewViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [
        IsOwnerOrReadCreate,
        IsAuthenticatedOrReadOnly,
    ]
