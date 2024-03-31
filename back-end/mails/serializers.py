from rest_framework import serializers

from items.serializers import CoreModelSerializer
from mails.models import Newsletter


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


class FeedbackSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=255, required=False)
    message = serializers.CharField(required=False)
