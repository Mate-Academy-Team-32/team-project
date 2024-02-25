from rest_framework import serializers

from items.serializers import CoreModelSerializer
from newsletter.models import Newsletter


class NewsletterSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = (
            "id",
            "subject",
            "text_content",
            "html_file",
            "scheduled_time",
        ) + CoreModelSerializer.Meta.fields
