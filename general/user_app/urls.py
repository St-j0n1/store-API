from django.urls import path
from .views import UserRegisterAPIView, UserProfileAPIView, UsersListAPIView, GuestListAPIView, GuestMessageAPIView

urlpatterns = [
    path('register/', UserRegisterAPIView.as_view(), name='register'),
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
    path('guest/message/', GuestMessageAPIView.as_view(), name='create-message'),
    path('list/', UsersListAPIView.as_view(), name='all-user-list'),
    path('guests/list/', GuestListAPIView.as_view(), name=''),

]
