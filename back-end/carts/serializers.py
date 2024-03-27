from rest_framework import serializers

from carts.models import CartItem, FavoriteItem
from items.serializers import ItemShortSerializer, CoreModelSerializer


class FavoriteListSerializer(CoreModelSerializer, serializers.ModelSerializer):
    item_info = ItemShortSerializer(read_only=True, source="item")

    class Meta:
        model = FavoriteItem
        fields = ("id", "item", "item_info")


class CartSerializer(CoreModelSerializer, serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ("id", "stock_item", "quantity") + CoreModelSerializer.Meta.fields

    def validate(self, data):
        """
        Check if the quantity exceeds the available stock quantity.
        """
        stock_item = data.get('stock_item')
        quantity = data.get('quantity')

        if stock_item and quantity:
            if quantity > stock_item.stock:
                raise serializers.ValidationError(
                    "Quantity exceeds available stock quantity."
                )

        return data


class ClearOperationSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=100, read_only=True)
