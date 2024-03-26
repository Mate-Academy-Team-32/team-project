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


class StockItemFilter(FilterSet):
    brand = filters.AllValuesFilter(field_name="item__brand__label")
    country = filters.AllValuesFilter(field_name="item__country")
    strength = filters.AllValuesFilter(field_name="item__strength")
    gender = filters.AllValuesFilter(field_name="item__gender")
    volume = filters.AllValuesFilter()
    item__id = filters.AllValuesFilter()
    price = filters.RangeFilter()
    tags = filters.AllValuesFilter(
        field_name="item__note_categories__notes__tag", distinct=True
    )

    class Meta:
        model = StockItem
        fields = []


class StockItemViewSet(CoreModelMixin, viewsets.ModelViewSet):
    queryset = StockItem.objects.all()
    pagination_class = ItemPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = StockItemFilter
    ordering_fields = ["price", "item__name", "rating_avg"]
    search_fields = ["item__name", "item__brand__label"]

    def filter_queryset(self, queryset):
        for backend in self.filter_backends:
            queryset = backend().filter_queryset(self.request, queryset, view=self)
        return queryset

    def get_queryset(self):
        queryset = self.queryset.annotate(
            rating_avg=(Round(Avg("item__reviews__rate"), 2)),
        )

        if self.action != "create":
            queryset.select_related("item")

        return self.filter_queryset(queryset)

    def get_serializer_class(self):
        if self.action == "list":
            return StockItemListSerializer

        if self.action == "retrieve":
            return StockItemDetailSerializer

        return StockItemSerializer


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
