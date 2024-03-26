from django.db.models import Avg, Count
from django.db.models.functions import Round
from django_filters import filters
from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
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


class ItemFilter(FilterSet):
    tags = filters.NumberFilter(field_name="note_categories__notes__tag", distinct=True)
    brand = filters.AllValuesFilter(field_name="brand__label")

    class Meta:
        model = Item
        fields = {
            "gender": ["exact"],
            "strength": ["exact"],
            "country": ["iexact"],
        }


class ItemPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"


class ItemViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = Item.objects.all()
    pagination_class = ItemPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = ItemFilter
    ordering_fields = ["release_date", "name", "rating_avg"]
    search_fields = ["name", "brand__label"]

    def filter_queryset(self, queryset):
        for backend in self.filter_backends:
            queryset = backend().filter_queryset(self.request, queryset, view=self)
        return queryset

    def get_queryset(self):
        queryset = self.queryset.annotate(
            rating_avg=(Round(Avg("reviews__rate"), 2)),
            rating_count=(Count("reviews")),
        )

        queryset = self.filter_queryset(queryset)

        if self.action != "create":
            queryset.select_related("reviews", "item_images").prefetch_related(
                "note_categories"
            )

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
                ("tag_id", OpenApiTypes.INT, 2),
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
        query_params = {
            "gender": "item__gender__in",
            "brand": "item__brand__label__in",
            "strength": "item__strength__in",
            "country": "item__country__in",
            "tag_id": "item__note_categories__notes__tag__in",
            "volume": "volume__in",
            "item_id": "item_id__in",
            "min_price": "price__gt",
            "max_price": "price__lt",
        }

        for param_name, param in query_params.items():
            val = (
                self.request.query_params.getlist(param_name)
                if "price" not in param_name
                else self.request.query_params.get(param_name)
            )
            print(f"Parameter: {param_name}, Values: {val}")

            if val:
                filter_kwargs = {f"{param}": val}
                queryset = (
                    queryset.filter(**filter_kwargs).distinct()
                    if param_name == "tag_id"
                    else queryset.filter(**filter_kwargs)
                )

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
                ("brand", OpenApiTypes.STR, "Chanel"),
                ("country", OpenApiTypes.STR, "France"),
                ("strength", OpenApiTypes.INT, 2),
                ("gender", OpenApiTypes.STR, "F"),
                ("tag_id", OpenApiTypes.INT, 2),
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
