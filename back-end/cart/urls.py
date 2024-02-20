from rest_framework import routers

from cart.views import CartViewSet, FavoriteListViewSet

router = routers.DefaultRouter()
router.register("cart", CartViewSet)
router.register("favorite", FavoriteListViewSet)

urlpatterns = router.urls

app_name = "cart"
