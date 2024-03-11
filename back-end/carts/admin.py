from django.contrib import admin

from carts.models import CartItem, FavoriteItem
from items.admin import CoreModelAdmin


@admin.register(CartItem)
class CartItemAdmin(CoreModelAdmin):
    search_fields = ("created_by__email",) + CoreModelAdmin.search_fields
    ordering = ("created_by__email", "-created_at")
    list_display = (
        "created_by",
        "stock_item",
        "quantity",
    ) + CoreModelAdmin.list_display


@admin.register(FavoriteItem)
class FavoriteAdmin(CoreModelAdmin):
    search_fields = ("created_by__email", "item",) + CoreModelAdmin.search_fields
    ordering = ("created_by__email", "-created_at")
    list_display = (
        "item",
    ) + CoreModelAdmin.list_display
