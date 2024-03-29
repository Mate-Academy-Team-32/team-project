from rest_framework import routers

from items.views import (
    ItemViewSet,
    ItemImageViewSet,
    TagViewSet,
    ReviewViewSet,
    BrandViewSet,
    StockItemViewSet,
    NoteViewSet,
)

router = routers.DefaultRouter()
router.register("images", ItemImageViewSet)
router.register("brands", BrandViewSet)
router.register("tags", TagViewSet)
router.register("notes", NoteViewSet)
router.register("reviews", ReviewViewSet)
router.register("stock_items", StockItemViewSet)
router.register("", ItemViewSet)

urlpatterns = router.urls

app_name = "items"
