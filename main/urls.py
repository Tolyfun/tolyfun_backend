from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('school', views.SchoolViewSet)
router.register('accounts', views.SetupViewSet, basename="profile")
router.register('classrooms', views.ClassroomViewSet)
router.register('students', views.StudentViewSet)
router.register('webhooks', views.WebhookViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', views.CustomAuthToken.as_view(), name="auth_login")
]
