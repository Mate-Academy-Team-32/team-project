from celery import shared_task
from celery.utils.log import get_task_logger
from django.core.mail import EmailMultiAlternatives, get_connection, EmailMessage
from django.template.loader import render_to_string

from PerfuMe_API.settings import EMAIL_HOST_USER
from mails.models import Newsletter, Subscription

logger = get_task_logger(__name__)


def get_newsletters_data(newsletter, subscribers):
    newsletters_data = []

    for subscriber in subscribers:
        newsletter_data = {
            "subject": newsletter.subject,
            "message": newsletter.text_content,
            "email": subscriber.email,
            "html_message": newsletter.html_file,
        }

        if newsletter.html_file:
            template_path = newsletter.html_file.path
            email_html_message = render_to_string(template_path)
            newsletter_data["html_message"] = email_html_message

        newsletters_data.append(newsletter_data)

    return newsletters_data


@shared_task
def newsletter_schedule_create(newsletter_id):
    newsletter = Newsletter.objects.get(pk=newsletter_id)
    subscribers = Subscription.objects.all()

    newsletters_data = get_newsletters_data(newsletter, subscribers)
    send_emails_with_data(newsletters_data)

    logger.info(
        f"Newsletter creation is scheduled successfully. Newsletter ID: {newsletter_id}"
    )


@shared_task
def send_emails_with_data(emails_data: list[dict]):
    """
    Celery task to send emails with provided data.

    :param emails_data: a list of email contents, with keys: `subject`, `message` and `email` (optional)
    """
    with get_connection() as connection:
        for email_data in emails_data:
            msg_data = {
                "subject": email_data.get("subject"),
                "body": email_data["message"],
                "from_email": EMAIL_HOST_USER,
                "to": [email_data.get("email", EMAIL_HOST_USER)],
                "connection": connection,
            }

            html_message = email_data.get("html_message")
            if html_message:
                msg = EmailMultiAlternatives(**msg_data)
                msg.attach_alternative(html_message, "text/html")
            else:
                msg = EmailMessage(**msg_data)

            msg.send()

            logger.info(f"Email to {msg_data['to']} sent successfully.")
