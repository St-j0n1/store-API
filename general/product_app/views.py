from django.shortcuts import render
from rest_framework.views import APIView

from .serializers import ProductCreateSerializer, CommentsSerializer, LikesSerializer, ProductInformationSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Comments, Likes


class ProductCreateAPIview(generics.CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ProductCreateSerializer
    queryset = Product.objects.all()


class CommentsCreateAPIview(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentsSerializer
    queryset = Comments.objects.all()


class CommentAPIview(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentsSerializer

    def post(self, request):
        user=request.user
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=request.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentEditAPIview(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentsSerializer

    def patch(self, request, *args, **kwargs):
        user = request.user
        comment_id = kwargs.get('pk')
        serializer = CommentsSerializer(partial=True)
        try:
            comment = Comments.objects.get(pk=comment_id, owner=user)
        except Comments.DoesNotExist:
            return Response({'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentsSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Comment updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeAPIview(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikesSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        product_id = kwargs.get('pk')
        serializer = LikesSerializer(user=user, product=product_id, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'liked successfully'}, status=status.HTTP_200_OK)


class ProductFullInfoAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = [ProductCreateSerializer, CommentsSerializer]

    def get(self, request, *args, **kwargs):
        all_comments = Comments.objects.filter(pk=kwargs.get('pk'))
        comments = CommentsSerializer(all_comments, many=True)
        likes = Likes.objects.filter(product_id=kwargs.get('pk')).count()
        product = Product.objects.get(pk=kwargs.get('pk'))
        serializer = ProductCreateSerializer(product, context={'request': request})
        return Response({
            'product': serializer.data,
            'likes': likes,
            'comments': comments.data
        }, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        product = Product.objects.get(pk=kwargs.get('pk'))
        product.delete()
        return Response({'message': 'deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



