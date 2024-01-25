from rest_framework import routers

from items.views import ItemViewSet, ItemImageViewSet, TagViewSet, ReviewViewSet

router = routers.DefaultRouter()
router.register("images", ItemImageViewSet)
router.register("tags", TagViewSet)
router.register("reviews", ReviewViewSet)
router.register("", ItemViewSet)

urlpatterns = router.urls

app_name = "items"
