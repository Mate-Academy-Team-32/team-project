from django.contrib.auth import update_session_auth_hash
from rest_framework import generics, viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import UserSerializer, UserProfileSerializer, ChangePasswordSerializer


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
    permission_classes = (IsAuthenticated, )
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
                {"error": "Incorrect old password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
