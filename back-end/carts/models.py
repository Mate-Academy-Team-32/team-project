from django.db import models

from items.models import StockItem, CoreModel, Item


class CartItem(CoreModel):
    quantity = models.PositiveIntegerField(default=1)
    stock_item = models.ForeignKey(StockItem, on_delete=models.CASCADE)


class FavoriteItem(CoreModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
