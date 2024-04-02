from django.db import models
from rest_framework.exceptions import ValidationError

from items.models import StockItem, CoreModel, Item


class CartItem(CoreModel):
    quantity = models.PositiveIntegerField(default=1)
    stock_item = models.ForeignKey(StockItem, on_delete=models.CASCADE)

    def clean(self):
        if self.quantity > self.stock_item.stock:
            raise ValidationError("Quantity must be less then stock.")


class FavoriteItem(CoreModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)


    class Meta:
        unique_together = ("created_by", "item")
