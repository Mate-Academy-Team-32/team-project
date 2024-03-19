from rest_framework import serializers

from items.models import Item, Tag, Review, ItemImage, Brand, StockItem, Note


class CoreModelSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        fields = ("created_at",)


class TagSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name") + CoreModelSerializer.Meta.fields


class NoteSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("id", "name", "tag") + CoreModelSerializer.Meta.fields


class BrandSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = (
            "id",
            "label",
            "logo_img",
        ) + CoreModelSerializer.Meta.fields


class ReviewSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("id", "item", "rate", "text") + CoreModelSerializer.Meta.fields


class ItemImageSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = ("id", "image")


class ItemImageDetailSerializer(ItemImageSerializer):
    class Meta:
        model = ItemImage
        fields = ("id", "item", "image") + CoreModelSerializer.Meta.fields


class ItemSerializer(CoreModelSerializer, serializers.ModelSerializer):
    tags = serializers.SerializerMethodField(read_only=True)
    rating_avg = serializers.SerializerMethodField(read_only=True)
    rating_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Item
        fields = (
            "id",
            "brand",
            "name",
            "logo_img",
            "gender",
            "rating_avg",
            "rating_count",
            "strength",
            "description",
            "release_date",
            "country",
            "tags",
        ) + CoreModelSerializer.Meta.fields

    def get_rating_avg(self, obj):
        reviews = obj.reviews.all()
        total_rating = sum(review.rate for review in reviews)
        avg_rating = total_rating / len(reviews) if reviews else 0

        return round(avg_rating, 2)

    def get_tags(self, obj):
        note_categories = obj.note_categories.all()
        tags = note_categories.values_list("note__tag", flat=True).distinct()
        return list(tags)

    def get_rating_count(self, obj):
        return obj.reviews.count()


class ItemListSerializer(ItemSerializer):
    class Meta:
        model = Item
        fields = (
            "id",
            "brand",
            "name",
            "logo_img",
            "gender",
            "rating_avg",
            "rating_count",
            "tags",
        )


class ItemDetailSerializer(ItemSerializer):
    item_images = ItemImageSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    strength = serializers.CharField(source="get_strength_display", read_only=True)
    gender = serializers.CharField(source="get_gender_display", read_only=True)

    class Meta:
        model = Item
        fields = ItemSerializer.Meta.fields + (
            "reviews",
            "item_images",
        )


class StockItemSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = StockItem
        fields = (
            "id",
            "volume",
            "price",
            "item",
            "stock",
        ) + CoreModelSerializer.Meta.fields


class StockItemListSerializer(StockItemSerializer):
    item = ItemListSerializer(read_only=True)

    class Meta:
        model = StockItem
        fields = (
            "id",
            "volume",
            "price",
            "item",
            "stock",
        ) + StockItemSerializer.Meta.fields


class StockItemDetailSerializer(StockItemSerializer):
    item = ItemDetailSerializer(read_only=True)

    class Meta:
        model = StockItem
        fields = (
            "id",
            "volume",
            "price",
            "item",
            "stock",
        ) + StockItemSerializer.Meta.fields
