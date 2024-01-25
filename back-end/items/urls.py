from rest_framework import routers

from items.views import ItemViewSet, ItemImageViewSet

router = routers.DefaultRouter()
router.register("images", ItemImageViewSet)
router.register("", ItemViewSet)

urlpatterns = router.urls

app_name = "items"
