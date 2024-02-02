from django.contrib import admin

from items.models import Tag, Review, Item, ItemImage


class CoreModelAdmin(admin.ModelAdmin):
    search_fields = ("created_by__email",)
    ordering = ("-created_at",)
    list_display = (
        "created_by",
        "created_at",
    )

    def save_model(self, request, obj, form, change):
        if getattr(obj, "created_by", None) is None:
            obj.created_by = request.user
        obj.save()


@admin.register(Item)
class ItemAdmin(CoreModelAdmin):
    list_display = (
        "label",
        "name",
        "inventory",
    ) + CoreModelAdmin.list_display
    search_fields = (
        "label",
        "name",
    ) + CoreModelAdmin.search_fields
    ordering = (
        "label",
        "name",
    ) + CoreModelAdmin.ordering


@admin.register(Review)
class ReviewAdmin(CoreModelAdmin):
    search_fields = ("item",) + CoreModelAdmin.search_fields
    list_display = (
        "item",
        "rate",
    ) + CoreModelAdmin.list_display
    ordering = (
        "item",
        "rate",
    ) + CoreModelAdmin.ordering


@admin.register(ItemImage)
class ItemImageAdmin(CoreModelAdmin):
    search_fields = ("item",) + CoreModelAdmin.search_fields
    ordering = ("item",) + CoreModelAdmin.ordering
    list_display = (
        "item",
        "image",
    ) + CoreModelAdmin.list_display


@admin.register(Tag)
class TagAdmin(CoreModelAdmin):
    search_fields = ("name",) + CoreModelAdmin.search_fields
    list_display = ("name",) + CoreModelAdmin.list_display