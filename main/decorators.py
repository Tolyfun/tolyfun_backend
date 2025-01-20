from django.http import HttpResponseForbidden
from functools import wraps


def staff_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_active and request.user.is_authenticated and request.user.is_staff:
            return view_func(request, *args, **kwargs)
        return HttpResponseForbidden("You do not have permission to access this page.")
    return _wrapped_view


def superuser_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_active and request.user.is_authenticated and request.user.is_superuser:
            return view_func(request, *args, **kwargs)
        return HttpResponseForbidden("You do not have permission to access this page.")
    return _wrapped_view
