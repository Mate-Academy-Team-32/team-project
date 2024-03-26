import stripe
from django.conf import settings

from django.http import HttpResponse
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from carts.models import CartItem
from items.views import CoreModelMixin
from orders.models import Order, OrderItem, Payment
from orders.serializers import OrderSerializer, PaymentSerializer
from orders.utils import create_new_payment, fulfill_order, cancel_order


class OrderViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
    CoreModelMixin,
):
    queryset = Order.objects.all().prefetch_related("order_items", "payment")
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(created_by=user)

    @transaction.atomic
    def perform_create(self, serializer, *args, **kwargs):
        items = self.request.query_params.get("items")

        if not items:
            return Response(
                {"detail": "No items provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            new_order = serializer.save(created_by=self.request.user, *args, **kwargs)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        items = items.split(",")

        for item in items:
            cart_item = get_object_or_404(CartItem, id=item, created_by_id=self.request.user)

            if cart_item.quantity > cart_item.stock_item.stock:
                new_order.delete()
                return Response({"detail": "Not enough stock available"}, status=status.HTTP_400_BAD_REQUEST)

            order_item = OrderItem.objects.create(
                order=new_order,
                quantity=cart_item.quantity,
                stock_item=cart_item.stock_item
            )

            cart_item.stock_item.stock -= order_item.quantity
            cart_item.stock_item.save()
            cart_item.delete()

        serializer = self.get_serializer(new_order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        pk = response.data.get("id")
        order = Order.objects.get(id=pk)

        create_new_payment(order)

        return response


class PaymentViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Payment.objects.all()

        return Payment.objects.filter(order__created_by=self.request.user)

    serializer_class = PaymentSerializer


stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    if event["type"] == "checkout.session.completed":
        # Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        session = stripe.checkout.Session.retrieve(
            event["data"]["object"]["id"],
            expand=["line_items"],
        )

        # Fulfill the purchase...
        fulfill_order(session)

    if event["type"] == "checkout.session.expired":
        session = stripe.checkout.Session.retrieve(
            event["data"]["object"]["id"],
            expand=["line_items"],
        )

        cancel_order(session)

    return HttpResponse(status=200)
