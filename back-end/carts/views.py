from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from carts.models import CartItem, FavoriteItem
from carts.serializers import CartSerializer, FavoriteListSerializer
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

    @action(detail=False, methods=["post"])
    def clear_cart(self, *args, **kwargs):
        user = self.request.user

        CartItem.objects.filter(created_by=user).delete()

        return Response(
            {"detail": "Cart has been cleared!"},
            status=status.HTTP_200_OK
        )


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

    def perform_create(self, serializer, *args, **kwargs):
        item_id = self.request.POST.get("item")
        liked_item = self.queryset.filter(item_id=item_id)
        if liked_item:
            liked_item.delete()
            return Response({"detail": "Item removed"}, status=status.HTTP_200_OK)
        liked_item = FavoriteItem.objects.create(
            item_id=item_id,
            created_by=self.request.user
        )

        serializer = self.get_serializer(liked_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def clear_cart(self, *args, **kwargs):
        user = self.request.user

        FavoriteItem.objects.filter(created_by=user).delete()

        return Response(
            {"detail": "Cart has been cleared!"},
            status=status.HTTP_200_OK
        )