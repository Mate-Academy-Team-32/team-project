from rest_framework import serializers

from items.serializers import CoreModelSerializer
from orders.models import Order, OrderItem, Payment


class PaymentSerializer(CoreModelSerializer, serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = (
            "id", "status", "order",
            "session_url", "session_id",
            "money_to_pay"
        )


class ShortPaymentSerializer(PaymentSerializer):

    class Meta:
        model = Payment
        fields = ("id", "status", "session_url", "money_to_pay")


class OrderItemSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "order", "quantity", "stock_item") + CoreModelSerializer.Meta.fields


class OrderSerializer(CoreModelSerializer, serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    payment = ShortPaymentSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ("id", "order_items", "payment") + CoreModelSerializer.Meta.fields
        read_only_fields = ("payment",)
