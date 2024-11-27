from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import verify_email

urlpatterns=[
    path('register/', views.register, name='register'),
    path('profile/', views.is_authenticated, name='profile'),
    path('login/', views.login, name='login'),
    path('verify/<str:uidb64>/<str:token>/', verify_email, name='verify_email'),
    path('adminToken/', views.generate_token, name='generate_token'),

]