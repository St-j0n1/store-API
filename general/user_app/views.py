from django.shortcuts import render
from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import status

from .models import User, Guests
from .serializer import UserRegisterSerializer, UserProfileSerializer, GuestInfoSerializer


class UserRegisterAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'Message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UsersListAPIView(ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer


class GuestMessageAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = GuestInfoSerializer
    def post(self, request):
        serializer = GuestInfoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.is_valid()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GuestListAPIView(ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = Guests.objects.all()
    serializer_class = GuestInfoSerializer
