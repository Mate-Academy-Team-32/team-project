from django.urls import path, include


urlpatterns = [
    path("", include("users.urls")),
    path(
        "items/",
        include("items.urls", namespace="item"),
    ),
]
