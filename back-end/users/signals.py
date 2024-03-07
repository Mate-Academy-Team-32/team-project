from django.conf.global_settings import EMAIL_HOST_USER
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created


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
    context = {
        "current_user": reset_password_token.user,
        "username": f"{reset_password_token.user.first_name} {reset_password_token.user.last_name}",
        "email": reset_password_token.user.email,
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

    msg = EmailMultiAlternatives(
        "Password reset for PerfuMe",
        email_plaintext_message,
        EMAIL_HOST_USER,
        [reset_password_token.user.email],
    )

    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
