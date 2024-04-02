from rest_framework import routers
from django.urls import path

from mails.views import SendFeedbackView, SubscriptionViewSet


router = routers.DefaultRouter()
router.register("subscriptions", SubscriptionViewSet)

urlpatterns = [
    path("send_feedback/", SendFeedbackView.as_view(), name="send_feedback"),
] + router.urls

app_name = "mails"
