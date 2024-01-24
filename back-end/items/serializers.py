from rest_framework import serializers

from .models import Item, Tag, Review, ItemImage

from users.serializers import UserSerializer


class CoreModelSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(read_only=True)
    created_by = UserSerializer(many=False, read_only=True)

    class Meta:
        fields = (
            "created_at",
            "created_by",
        )


class TagSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name") + CoreModelSerializer.Meta.fields


class ReviewSerializer(CoreModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("id", "rate", "text") + CoreModelSerializer.Meta.fields
