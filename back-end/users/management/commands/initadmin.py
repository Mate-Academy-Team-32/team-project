import logging
import os

from django.contrib.auth import get_user_model
from django.core.management import BaseCommand


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def handle(self, *args, **options):
        if get_user_model().objects.count() == 0:
            email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
            password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
            logger.info(f"Creating account for {email}")

            admin = get_user_model().objects.create_superuser(
                email=email, password=password
            )
            logger.info("Superuser account created successfully.")
        else:
            logger.warning("Admin accounts can only be initialized if no Users exist.")
