from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf.global_settings import EMAIL_HOST_USER
from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string

from mails.models import Newsletter, Subscription

logger = get_task_logger(__name__)


def get_newsletter_emails(newsletter, subscribers):
    messages = []

    for subscriber in subscribers:
        msg = EmailMultiAlternatives(
            newsletter.subject,
            newsletter.text_content,
            EMAIL_HOST_USER,
            [subscriber.email],
        )

        if newsletter.html_file:
            template_path = newsletter.html_file.path
            email_html_message = render_to_string(template_path)
            msg.attach_alternative(email_html_message, "text/html")

        messages.append(msg)

    return messages


@shared_task
def newsletter_schedule_create(newsletter_id, *args, **kwargs):
    newsletter = Newsletter.objects.get(pk=newsletter_id)
    subscribers = Subscription.objects.all()

    connection = get_connection()
    messages = get_newsletter_emails(newsletter, subscribers)
    connection.send_messages(messages)

    logger.info(
        f"Newsletter creation is scheduled successfully. Newsletter ID: {newsletter_id}"
    )
