from rest_framework import routers

from carts.views import CartItemViewSet, FavoriteItemViewSet

router = routers.DefaultRouter()
router.register("carts", CartItemViewSet)
router.register("favorites", FavoriteItemViewSet)

urlpatterns = router.urls

app_name = "carts"
