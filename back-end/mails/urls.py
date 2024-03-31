from django.urls import path

from mails.views import SendFeedbackView

urlpatterns = [
    path("send_feedback/", SendFeedbackView.as_view(), name="send_feedback"),
]

app_name = "mails"
