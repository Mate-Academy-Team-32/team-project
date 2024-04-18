from rest_framework import viewsets, generics, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.permissions import IsAdminOrOwnerOrReadCreate
from mails.serializers import FeedbackSerializer, SubscriptionSerializer
from mails.models import Subscription
from mails.tasks import send_emails_with_data


class SendFeedbackView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = FeedbackSerializer

    @staticmethod
    def get_feedback_data(serializer):
        username = serializer.validated_data["name"]
        email = serializer.validated_data["email"]

        subject = serializer.validated_data.get(
            "subject", f"from {username} on PerfuMe`s service"
        )
        subject = f"NEW FEEDBACK: {subject}"

        default_message = (
            f"Hello,\n"
            f"Please contact me. I would like to share my "
            f"questions and receive your assistance.\n\n"
            f"Best regards,\n"
            f"{username}"
        )
        message_text = serializer.validated_data.get("message", default_message)
        message_text += f"\n\nFeel free to reach out to me at: {email}"

        return {"subject": subject, "message": message_text}

    @staticmethod
    def get_confirmation_data(serializer):
        username = serializer.validated_data["name"]
        email = serializer.validated_data["email"]

        subject = "PerfuMe: Feedback received"
        message_text = (
            f"Dear {username},"
            f"\nThank you for your feedback. "
            f"We have received your message and our team will get back to you as soon as possible."
            f"\n\nBest regards,"
            f"\nThe PerfuMe Team"
        )

        return {"subject": subject, "message": message_text, "email": email}

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            feedback_data = self.get_feedback_data(serializer)
            confirmation_data = self.get_confirmation_data(serializer)

            send_emails_with_data.delay([feedback_data, confirmation_data])

            return Response(
                {"message": "Feedback sent successfully."},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"message": "Failed to send feedback.", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SubscriptionViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = (IsAdminOrOwnerOrReadCreate,)
