from rest_framework import serializers

from items.serializers import CoreModelSerializer
from orders.models import Order, OrderItem


class OrderItemSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "order", "quantity", "stock_item")


class OrderSerializer(CoreModelSerializer, serializers.ModelSerializer):
    order_items = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ("id", "order_items") + CoreModelSerializer.Meta.fields
