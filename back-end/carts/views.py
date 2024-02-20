from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from carts.models import CartItem, FavoriteItem
from carts.serializers import CartSerializer, FavoriteListSerializer
from items.views import CoreModelMixin


class CartViewSet(
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
    def clear_cart(self):
        user = self.request.user

        CartItem.objects.filter(created_by=user).delete()


class FavoriteListViewSet(
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

    @action(detail=False, methods=["post"])
    def clear_cart(self):
        user = self.request.user

        FavoriteItem.objects.filter(created_by=user).delete()
