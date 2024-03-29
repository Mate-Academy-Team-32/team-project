from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("", include("users.urls")),
    path(
        "items/",
        include("items.urls", namespace="item"),
    ),
    path(
        "cart/",
        include("cart.urls", namespace="cart")
    ),
    path(
        "mails/",
        include("mails.urls", namespace="mail"),
    ),
    path("doc/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "doc/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "password_reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
    path("", include("orders.urls", namespace="orders"))
]
