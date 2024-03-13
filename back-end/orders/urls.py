from django.urls import path
from rest_framework import routers

from orders.views import OrderViewSet, PaymentViewSet, stripe_webhook

router = routers.DefaultRouter()
router.register("orders", OrderViewSet)
router.register(r"payments", PaymentViewSet, basename="payment-detail")

urlpatterns = [
    path("webhooks/stripe", stripe_webhook, name="stripe-webhook"),
] + router.urls

app_name = "orders"
