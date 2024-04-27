from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created

from mails.tasks import send_emails_with_data
from orders.signals import order_created_signal


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    current_user = reset_password_token.user
    context = {
        "current_user": current_user,
        "username": (
            f"{current_user.first_name} " 
            f"{current_user.last_name}"
        ).replace("None", ""),
        "email": current_user.email,
        "reset_password_url": "{}?token={}".format(
            instance.request.build_absolute_uri(
                reverse("password_reset:reset-password-confirm")
            ),
            reset_password_token.key,
        ),
    }

    email_html_message = render_to_string("password_reset_email.html", context)

    greeting_text = (
        f"Hello {context.get('username')}"
        if context.get("username").strip()
        else "Hello"
    )
    email_plaintext_message = (
        f"{greeting_text}, "
        f"we've received a request to reset your password. Please click on the link "
        f"below to reset your password: {context.get('reset_password_url')}"
    )

    reset_password_data = {
        "subject": "Password reset for PerfuMe",
        "message": email_plaintext_message,
        "email": current_user.email,
        "html_message": email_html_message,
    }
    send_emails_with_data.delay([reset_password_data])


@receiver(order_created_signal)
def handle_order_created(sender, order, **kwargs):
    """
    Handles order creation
    When an order is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param order: Order object
    :param kwargs:
    :return:
    """
    order_payment = order.payment.get()
    current_user = order.created_by

    context = {
        "username": (
            f"{current_user.first_name} " 
            f"{current_user.last_name}"
        ).replace("None", ""),
        "email": current_user.email,
        "order_id": order.id,
        "order_created_at": order.created_at,
        "payment_status": order_payment.status,
        "total": order_payment.money_to_pay,
    }

    greeting_text = (
        f"Dear {context.get('username')}"
        if context.get("username").strip()
        else "Hello"
    )

    email_plaintext_message = (
        f"{greeting_text}, "
        "\nThank you for your order on PerfuMe! "
        "\nWe're excited to confirm that your order has been successfully placed."
        "\n\nORDER DETAILS"
        f"\nOrder ID: #{order.pk}"
        f"\nDate: {order.created_at.strftime('%d/%m/%y')}"
        f"\nPayment status: {order_payment.status}"
        "\n\nITEMS"
    )

    order_items = []
    for item in order.order_items.all():
        item_details = {
            "name": item.stock_item.item.name,
            "volume": item.stock_item.volume,
            "quantity": item.quantity,
            "price": item.stock_item.price,
        }
        email_plaintext_message += (
            f"\n{item_details['name']} ({item_details['volume']}ml) "
            f"- Quantity: {item_details['quantity']}, Price: {item_details['price']}$"
        )
        order_items.append(item_details)
    context["order_items"] = order_items

    email_plaintext_message += (
        f"\nTotal Amount: {order_payment.money_to_pay}$"
        "\n\nThank you for choosing PerfuMe!"
        "\n\nBest regards,"
        "\nThe PerfuMe Team"
    )

    order_data = {
        "subject": "PerfuMe: Order Confirmation",
        "message": email_plaintext_message,
        "email": context.get("email"),
    }

    send_emails_with_data.delay([order_data])
