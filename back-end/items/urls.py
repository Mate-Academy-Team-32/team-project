from rest_framework import routers

from items.views import ItemViewSet, ItemImageViewSet, TagViewSet

router = routers.DefaultRouter()
router.register("images", ItemImageViewSet)
router.register("tags", TagViewSet)
router.register("", ItemViewSet)

urlpatterns = router.urls

app_name = "items"
