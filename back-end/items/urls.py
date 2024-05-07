from rest_framework import routers
from django.urls import path

from items.views import (
    ItemViewSet,
    ItemImageViewSet,
    TagViewSet,
    ReviewViewSet,
    BrandViewSet,
    StockItemViewSet,
    NoteViewSet,
    FilterKeysAPIView,
)

router = routers.DefaultRouter()
router.register("images", ItemImageViewSet)
router.register("brands", BrandViewSet)
router.register("tags", TagViewSet)
router.register("notes", NoteViewSet)
router.register("reviews", ReviewViewSet)
router.register("stock_items", StockItemViewSet)
router.register("", ItemViewSet)

urlpatterns = [
    path('filter-keys/', FilterKeysAPIView.as_view(), name='filter_keys'),
] + router.urls

app_name = "items"
