# permissions.py
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and is a superuser (admin)
        return request.user.is_authenticated and request.user.is_superuser
