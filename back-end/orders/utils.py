import stripe
from django.conf import settings

from orders.models import Order, Payment

stripe.api_key = settings.STRIPE_SECRET_KEY


def create_new_checkout_session(order: Order) -> stripe.checkout.Session:
    order_items = order.order_items.all()
    line_items = []

    for item in order_items:

        item_dict = {
            "price_data": {
                "currency": "usd",
                "unit_amount": int(item.stock_item.price * 100),
                "product_data": {
                    "name": f"{item.stock_item.item.name}, {item.stock_item.item.brand}",
                    "images": [item.stock_item.item.logo_img, ]
                },
            },
            "quantity": item.quantity,
        }

        line_items.append(item_dict)

    checkout_session = stripe.checkout.Session.create(
        line_items=line_items,
        metadata={
            "order_id": order.id
        },
        mode='payment',
        success_url="https://google.com",  # Update in production!!!
        cancel_url="https://facebook.com",  # Update in production!!!
    )

    return checkout_session


def create_new_payment(order: Order) -> Payment:
    session = create_new_checkout_session(order)
    price = session.amount_total
    payment = Payment.objects.create(
        order=order,
        session_id=session.id,
        session_url=session.url,
        money_to_pay=price
    )

    return payment


def fulfill_order(session):
    order_id = session["metadata"]["order_id"]
    payment = Payment.objects.get(order_id=order_id)

    payment.status = "PAID"
    payment.save()


def cancel_order(session):
    order_id = session["metadata"]["order_id"]
    order = Order.objects.get(id=order_id)
    order.status = "CANCELLED"
    order.save()

    payment = Payment.objects.get(order_id=order_id)
    payment.delete()
