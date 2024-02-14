from rest_framework import serializers

from models import CartItem
from items.serializers import ItemShortSerializer


class CoreModelSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        fields = ("created_at",)


class FavoriteListSerializer(CoreModelSerializer, serializers.ModelSerializer):
    item = ItemShortSerializer()


class CartSerializer(CoreModelSerializer, serializers.ModelSerializer):
    stock_item = ItemShortSerializer()  # Change to StockItem when done

    class Meta:
        model = CartItem
        fields = ("id", "item", "quantity") + CoreModelSerializer.Meta.fields
