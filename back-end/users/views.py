import random
import string
from django.utils import timezone
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from rest_framework.views import APIView
from django.contrib.auth import update_session_auth_hash, get_user_model
from rest_framework import generics, viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import (
    UserSerializer,
    UserProfileSerializer,
    ChangePasswordSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class UserProfileViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = request.user

            if user.check_password(serializer.data.get("old_password")):
                user.set_password(serializer.data.get("new_password"))
                user.save()
                update_session_auth_hash(
                    request, user
                )  # To update session after password change

                return Response(
                    {"message": "Password changed successfully."},
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"error": "Incorrect old password."}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            user = User.objects.filter(email=email).first()
            if user:
                code = ''.join(random.choices(string.digits, k=6))
                user.password_reset_code = code
                user.password_reset_code_expiry = timezone.now() + timezone.timedelta(minutes=15)
                user.save()
                html_message = render_to_string("password_reset_email.html", {"code": code})
                plain_message = strip_tags(html_message)
                send_mail(
                    "Password Reset Confirmation Code",
                    plain_message,
                    "from@example.com",
                    [email],
                    html_message=html_message,
                    fail_silently=False,
                )
                return Response({"message": "Confirmation code sent to email"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            code = serializer.validated_data["code"]
            new_password = serializer.validated_data["new_password"]
            user = User.objects.filter(email=email, password_reset_code=code).first()
            if user and user.password_reset_code_expiry > timezone.now():
                user.set_password(new_password)
                user.password_reset_code = None
                user.password_reset_code_expiry = None
                user.save()
                return Response({"message": "Password has been reset"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid code or email"}, status=status.HTTP_400_BAD_REQUEST)
