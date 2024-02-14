from rest_framework import routers

from views import CartViewSet, FavoriteListViewSet

router = routers.DefaultRouter()
router.register("images", CartViewSet)
router.register("tags", FavoriteListViewSet)

urlpatterns = router.urls

app_name = "cart"
