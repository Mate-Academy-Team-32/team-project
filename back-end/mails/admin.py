from django.contrib import admin
from django.utils import timezone
from rest_framework.exceptions import ValidationError

from items.admin import CoreModelAdmin
from mails.models import Newsletter
from mails.tasks import newsletter_schedule_create


@admin.register(Newsletter)
class ItemAdmin(CoreModelAdmin):
    search_fields = ("subject",) + CoreModelAdmin.search_fields
    ordering = ("-scheduled_time",) + CoreModelAdmin.ordering
    list_display = (
        "subject",
        "scheduled_time",
    ) + CoreModelAdmin.list_display

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if obj.scheduled_time:
            if obj.scheduled_time <= timezone.now():
                raise ValidationError(
                    {"scheduled_time": "Scheduled time cannot be in the past."}
                )

            newsletter_schedule_create.apply_async(
                args=[obj.pk], eta=obj.scheduled_time
            )

        else:
            newsletter_schedule_create.apply_async(args=[obj.pk], eta=None)
