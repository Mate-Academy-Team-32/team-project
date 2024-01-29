from rest_framework import serializers

from items.models import Item, Tag, Review, ItemImage


class CoreModelSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        fields = ("created_at",)


class TagSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name") + CoreModelSerializer.Meta.fields


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
    class Meta:
        model = Item
        fields = (
            "id",
            "label",
            "name",
            "logo_img",
            "gender",
            "strength",
            "size",
            "description",
            "release_date",
            "country",
            "tags",
            "price",
            "inventory",
        ) + CoreModelSerializer.Meta.fields


class ItemListSerializer(ItemSerializer):
    rating_avg = serializers.FloatField(read_only=True)
    rating_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Item
        fields = (
            "id",
            "label",
            "name",
            "logo_img",
            "gender",
            "size",
            "price",
            "reviews",
            "rating_avg",
            "rating_count",
        )


class ItemDetailSerializer(ItemSerializer):
    rating_avg = serializers.FloatField(read_only=True)
    rating_count = serializers.IntegerField(read_only=True)
    item_images = ItemImageSerializer(many=True, read_only=True)

    class Meta:
        model = Item
        fields = ItemSerializer.Meta.fields + (
            "reviews",
            "rating_avg",
            "rating_count",
            "item_images",
        )
