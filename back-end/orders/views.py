from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

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
        print(self.request.query_params)
        items = self.request.query_params.get("items").split(",")

        if items:
            new_order = serializer.save(created_by=self.request.user, *args, **kwargs)

            for item in items:
                cart_item = CartItem.objects.get(id=item)
                OrderItem.objects.create(
                    order=new_order,
                    quantity=cart_item.quantity,
                    stock_item=cart_item.stock_item
                )
                # cart_item.stock_item.quantity -= cart_item.quantity
                cart_item.delete()
        else:
            return False

        return new_order
