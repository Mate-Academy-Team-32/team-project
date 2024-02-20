from django.db import models

from items.models import Item, CoreModel


class CartItem(CoreModel):
    quantity = models.TextField(default=1)
    stock_item = models.ForeignKey(Item, on_delete=models.CASCADE)  # Change to StockItem when it's done


class FavoriteItem(CoreModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
