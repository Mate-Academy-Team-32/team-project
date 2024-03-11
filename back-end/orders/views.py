from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from carts.models import CartItem
from orders.models import Order, OrderItem
from orders.serializers import OrderSerializer


class OrderViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Order.objects.all().prefetch_related("order_items")
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(created_by=user)

    @transaction.atomic
    def perform_create(self, serializer, *args, **kwargs):
        items = self.request.query_params.get("items")

        if not items:
            return Response(
                {"detail": "No items provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            new_order = serializer.save(created_by=self.request.user, *args, **kwargs)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        items = items.split(",")

        for item in items:
            cart_item = get_object_or_404(CartItem, id=item)

            if cart_item.quantity > cart_item.stock_item.stock:
                new_order.delete()
                return Response({"detail": "Not enough stock available"}, status=status.HTTP_400_BAD_REQUEST)

            order_item = OrderItem.objects.create(
                order=new_order,
                quantity=cart_item.quantity,
                stock_item=cart_item.stock_item
            )

            cart_item.stock_item.stock -= order_item.quantity
            cart_item.stock_item.save()
            cart_item.delete()

        serializer = self.get_serializer(new_order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
