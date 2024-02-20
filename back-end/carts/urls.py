from rest_framework import routers

from carts.views import CartViewSet, FavoriteListViewSet

router = routers.DefaultRouter()
router.register("carts", CartViewSet)
router.register("favorite", FavoriteListViewSet)

urlpatterns = router.urls

app_name = "carts"
