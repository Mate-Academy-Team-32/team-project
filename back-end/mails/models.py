import os
import uuid
from django.utils.text import slugify
from django.db import models

from items.models import CoreModel


def get_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(str(instance))}-{uuid.uuid4()}{extension}"
    dirname = f"{slugify(type(instance).__name__)}s/"

    return os.path.join("templates/", dirname, filename)


class Newsletter(CoreModel):
    DEFAULT_SUBJECT = "PerfuMe NEWS: Exciting updates await!"

    subject = models.CharField(max_length=255, default=DEFAULT_SUBJECT)
    text_content = models.TextField()
    html_file = models.FileField(blank=True, null=True, upload_to=get_file_path)
    scheduled_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.subject} - {self.scheduled_time}"
