from rest_framework import mixins
from django.contrib.auth import get_user_model

from models import CartItem, FavoriteItem
from serializers import CartSerializer, FavoriteListSerializer


class CartViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin
):
    queryset = CartItem.objects.filter(created_by=get_user_model())
    serializer = CartSerializer


class FavoriteListViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin
):
    queryset = FavoriteItem.objects.filter(created_by=get_user_model())
    serializer = FavoriteListSerializer

