from django.db import models

from items.models import CoreModel


class Newsletter(CoreModel):
    DEFAULT_SUBJECT = "PerfuMe NEWS: Exciting updates await!"

    subject = models.CharField(max_length=255, default=DEFAULT_SUBJECT)
    text_content = models.TextField()
    scheduled_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.subject} - {self.scheduled_time}"
