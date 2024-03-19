from django.contrib import admin

from items.models import (
    Tag,
    Review,
    Item,
    ItemImage,
    Brand,
    StockItem,
    Note,
    NoteCategory,
)


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


@admin.register(Brand)
class BrandAdmin(CoreModelAdmin):
    search_fields = ("label",) + CoreModelAdmin.search_fields
    list_display = ("label",) + CoreModelAdmin.list_display


class NoteCategoryInline(admin.TabularInline):
    model = NoteCategory
    autocomplete_fields = ("note",)
    max_num = 3


@admin.register(Item)
class ItemAdmin(CoreModelAdmin):
    list_display = (
        "brand",
        "name",
    ) + CoreModelAdmin.list_display
    search_fields = (
        "brand",
        "name",
    ) + CoreModelAdmin.search_fields
    ordering = (
        "brand",
        "name",
    ) + CoreModelAdmin.ordering
    autocomplete_fields = ("brand",)
    inlines = (NoteCategoryInline,)


@admin.register(StockItem)
class StockItemAdmin(CoreModelAdmin):
    list_display = (
        "item",
        "volume",
        "price",
        "stock",
    ) + CoreModelAdmin.list_display
    search_fields = (
        "item__name",
        "volume",
        "price",
        "stock",
    ) + CoreModelAdmin.search_fields
    ordering = (
        "item__name",
        "-volume",
    ) + CoreModelAdmin.ordering
    autocomplete_fields = ("item",)


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
    autocomplete_fields = ("item",)


@admin.register(ItemImage)
class ItemImageAdmin(CoreModelAdmin):
    search_fields = ("item",) + CoreModelAdmin.search_fields
    ordering = ("item",) + CoreModelAdmin.ordering
    list_display = (
        "item",
        "image",
    ) + CoreModelAdmin.list_display
    autocomplete_fields = ("item",)


@admin.register(Tag)
class TagAdmin(CoreModelAdmin):
    search_fields = ("name",) + CoreModelAdmin.search_fields
    list_display = ("name",) + CoreModelAdmin.list_display


@admin.register(Note)
class NoteAdmin(CoreModelAdmin):
    search_fields = (
        "name",
        "tag",
    ) + CoreModelAdmin.search_fields
    list_display = (
        "name",
        "tag",
    ) + CoreModelAdmin.list_display
    autocomplete_fields = ("tag",)
