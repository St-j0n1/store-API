# serializers.py
from rest_framework import serializers
from rest_framework.response import Response
from .models import Product, ProductImageUrl, Comments, Likes
from user_app.serializer import UserProfileSerializer


class ProductImageUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImageUrl
        fields = ['url', 'alt']


class ProductCreateSerializer(serializers.ModelSerializer):
    image_urls = ProductImageUrlSerializer(many=True, source='productimageurl_set')

    class Meta:
        model = Product
        fields = ['title', 'description', 'category', 'color', 'price', 'on_sale', 'sale_price', 'image_urls']

    def create(self, validated_data):
        image_urls = validated_data.pop('productimageurl_set')
        product = Product.objects.create(**validated_data)

        if image_urls:
            for image_url in image_urls:
                ProductImageUrl.objects.create(product=product, **image_url)

        return product


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'comment', 'owner', 'product']


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ['id', 'user', 'product']


class CommentDetailsSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Comments
        fields = ['id', 'comment', 'owner', 'product']

    def get_owner_username(self, obj):
        return obj.owner.username


class ProductInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'