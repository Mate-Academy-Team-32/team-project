from rest_framework import serializers

from carts.models import CartItem, FavoriteItem
from items.serializers import ItemShortSerializer, CoreModelSerializer


class FavoriteListSerializer(CoreModelSerializer, serializers.ModelSerializer):
    item_info = ItemShortSerializer(read_only=True)

    class Meta:
        model = FavoriteItem
        fields = ("id", "item", "item_info")


class CartSerializer(CoreModelSerializer, serializers.ModelSerializer):
    # stock_item = ItemShortSerializer()  # Change to StockItem when done

    class Meta:
        model = CartItem
        fields = ("id", "stock_item", "quantity") + CoreModelSerializer.Meta.fields