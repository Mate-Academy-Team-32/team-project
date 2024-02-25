from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.views import (
    RegisterView,
    UserProfileViewSet,
    ChangePasswordView,
    SubscriptionViewSet,
)

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="registration"),
    path("change_password/", ChangePasswordView.as_view(), name="change_password"),
    path(
        "profile/",
        UserProfileViewSet.as_view(
            {"get": "retrieve", "put": "update", "patch": "update"}
        ),
        name="profile",
    ),
    path(
        "subscription/",
        SubscriptionViewSet.as_view({"get": "retrieve", "put": "update"}),
        name="subscription",
    ),
]
