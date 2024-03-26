from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf.global_settings import EMAIL_HOST_USER
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives, get_connection

from newsletter.models import Newsletter


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

        messages.append(msg)

    return messages


@shared_task
def newsletter_schedule_create(newsletter_id, *args, **kwargs):
    newsletter = Newsletter.objects.get(pk=newsletter_id)
    subscribers = get_user_model().objects.filter(newsletter_subscription=True)

    connection = get_connection()
    messages = get_newsletter_emails(newsletter, subscribers)
    connection.send_messages(messages)

    logger.info(
        f"Newsletter creation is scheduled successfully. Newsletter ID: {newsletter_id}"
    )
