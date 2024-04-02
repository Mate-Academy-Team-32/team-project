from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            (request.user and request.user.is_staff)
            or request.method in SAFE_METHODS
        )


class IsOwnerOrReadCreate(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(
            obj.created_by == request.user
            or request.method in ("GET", "HEAD", "OPTIONS", "POST")
        )


class IsAdminOrOwnerOrReadCreate(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(
            request.user
            and (
                request.user.is_staff
                or (request.user.is_authenticated and obj.email == request.user.email)
            )
            or request.method in ("GET", "HEAD", "OPTIONS", "POST")
        )
