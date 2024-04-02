from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from carts.models import CartItem, FavoriteItem
from carts.serializers import CartSerializer, FavoriteListSerializer, ClearOperationSerializer
from items.views import CoreModelMixin


class CartItemViewSet(
    CoreModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = CartItem.objects.all()
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return CartItem.objects.filter(created_by=user)

    def create(self, request, *args, **kwargs):
        stock_item_id = request.POST.get("stock_item")
        quantity = int(request.POST.get("quantity"))

        # Check if a CartItem with the given stock_item already exists
        existing_cart_item = CartItem.objects.filter(
            created_by=self.request.user,
            stock_item=stock_item_id
        ).first()

        if existing_cart_item:
            try:
                existing_cart_item.quantity += quantity
                existing_cart_item.clean()
                existing_cart_item.save()

                serializer = self.get_serializer(existing_cart_item)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return super().create(request, *args, **kwargs)

    @action(detail=False, methods=["post"], serializer_class=ClearOperationSerializer)
    def clear_cart(self, *args, **kwargs):
        """
            Endpoint for deleting all cart item objects for this user
        """
        user = self.request.user

        CartItem.objects.filter(created_by=user).delete()

        return Response({"message": "Cart have been cleared!"}, status=status.HTTP_200_OK)


class FavoriteItemViewSet(
    CoreModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = FavoriteItem.objects.all()
    serializer_class = FavoriteListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return FavoriteItem.objects.filter(created_by=user)


    @action(detail=False, methods=["post"], serializer_class=ClearOperationSerializer)
    def clear_favorite(self, *args, **kwargs):
        """
            Endpoint for deleting all favorites objects for this user
        """
        user = self.request.user

        FavoriteItem.objects.filter(created_by=user).delete()

        return Response({"message": "Favorites have been cleared!"}, status=status.HTTP_200_OK)
