from rest_framework import routers

from orders.views import OrderViewSet, PaymentViewSet

router = routers.DefaultRouter()
router.register("orders", OrderViewSet)
router.register(r"payments", PaymentViewSet, basename="payment-detail")

urlpatterns = router.urls

app_name = "orders"
