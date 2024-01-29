from rest_framework import generics, viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import UserSerializer, UserProfileSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer


class UserProfileViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user
