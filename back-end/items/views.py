from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, F, Max, Min
from django.db.models.fields import Field
from django.db.models.functions import Round, Coalesce
from django.db.models import Avg, OuterRef, Subquery, Exists, Value, BooleanField
from django.forms import ChoiceField

from django_filters import filters
from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action

from api.permissions import IsOwnerOrReadCreate
from items.models import Item, ItemImage, Tag, Review, Brand, StockItem, Note
from carts.models import FavoriteItem
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
        if self.request.user.is_superuser and 'created_by' in self.request.data:
            created_by_id = self.request.data.pop('created_by')
            created_by = get_user_model().objects.get(pk=created_by_id)
            return serializer.save(created_by=created_by, *args, **kwargs)
        else:
            return serializer.save(created_by=self.request.user, *args, **kwargs)

    def update(self, instance, validated_data):
        # Remove the created_by field from validated_data during updates
        validated_data.pop('created_by', None)
        return super().update(instance, validated_data)


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

class FilterKeysAPIView(APIView):
    def get(self, request):
        queryset = Item.objects.all().select_related("stock_items")

        special_filters = ("price", "item__id", "tags")

        filter_fields = set(StockItemFilter.get_filters().keys()) - set(special_filters)
        filter_values = {}

        for field_name in filter_fields:
            if not hasattr(Item, field_name):
                field_name = "stock_items__" + field_name

            # item_field = getattr(Item, field_name)
            # if hasattr(item_field, "name") or hasattr(item_field, "label"):
            #     stock_item_values = queryset.values_list(field_name + "__name", flat=True).distinct()
            # else:
            stock_item_values = queryset.values_list(field_name, flat=True).distinct()

            filter_values[field_name] = list(stock_item_values)

        price_aggregate = StockItem.objects.aggregate(
            max_price=Max('price'),
            min_price=Min('price')
        )

        filter_values["price"] = [price_aggregate['min_price'], price_aggregate['max_price']]
        filter_values["tags"] = Tag.objects.values_list("name", flat=True).distinct()

        return Response(filter_values, status=status.HTTP_200_OK)


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
    queryset = StockItem.objects.all().select_related('item')
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
        ).annotate(
            liked=Exists(
                FavoriteItem.objects.filter(item_id=OuterRef('item_id'), created_by=self.request.user.id)
            )
        ).annotate(
            liked=Coalesce('liked', Value(False), output_field=BooleanField())
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


    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def get_filters(self, request):
        filterset = self.filterset_class(data=request.GET, queryset=self.queryset)
        filterset.is_valid()
        available_filters = {}

        for name, field in filterset.form.fields.items():
            if isinstance(field, ChoiceField):
                choices = [value[0] for value in field.choices if value[0]]
                available_filters[name] = choices

        return Response(available_filters)



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
