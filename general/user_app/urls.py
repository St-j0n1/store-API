from django.urls import path
from .views import UserRegisterAPIView, UserProfileAPIView

urlpatterns = [
    path('register/', UserRegisterAPIView.as_view(), name='register'),
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
]
