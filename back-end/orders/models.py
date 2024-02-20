from django.db import models

from items.models import Item, CoreModel


PAYMENT_STATUS_CHOICES = (("PENDING", "Pending"), ("PAID", "Paid"))
ORDER_STATUS_CHOICES = (("ACTIVE", "Active"), ("CANCELLED", "Cancelled"))


class Order(CoreModel, models.Model):
    status = models.CharField(choices=ORDER_STATUS_CHOICES, default="ACTIVE", max_length=144)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)
    stock_item = models.ForeignKey(Item, on_delete=models.CASCADE)  # Change to StockItem when its ready


# class Payment(models.Model):
#     status = models.CharField(choices=PAYMENT_STATUS_CHOICES, default="PENDING", max_length=144)
#     orders = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
#     session_url = models.URLField(max_length=500)
#     session_id = models.CharField(max_length=240)
#     money_to_pay = models.DecimalField(max_digits=8, decimal_places=2)
