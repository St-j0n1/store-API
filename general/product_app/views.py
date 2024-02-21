from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Product
from .serializers import ProductSerializers
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status


class ProductCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    parser_class = [MultiPartParser, FormParser]
    serializer_class = ProductSerializers
