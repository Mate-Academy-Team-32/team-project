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
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(created_by=user)

    def perform_create(self, serializer, *args, **kwargs):
        items = self.request.query_params.get("items").split(",")

        if items:
            new_order = serializer.save(created_by=self.request.user, *args, **kwargs)

            for item in items:
                cart_item = CartItem.objects.get(id=item)

                if cart_item.quantity > cart_item.stock_item.quantity:
                    return Response({"detail": "Not enough stock available"}, status=status.HTTP_400_BAD_REQUEST)

                OrderItem.objects.create(
                    order=new_order,
                    quantity=cart_item.quantity,
                    stock_item=cart_item.stock_item
                )
                # cart_item.stock_item.quantity -= cart_item.quantity
                cart_item.delete()
        else:
            return Response(
                {"detail": "No items provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return new_order
