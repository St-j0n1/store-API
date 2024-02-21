# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('image',)


class ProductSerializer(serializers.ModelSerializer):
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False),
        write_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'category', 'price', 'on_sale', 'sale_price', 'create_date', 'images',
                  'uploaded_images')

    def create(self, validated_data):
        uploaded_images_data = validated_data.pop("uploaded_images")
        product = Product.objects.create(**validated_data)

        for image_data in uploaded_images_data:
            ProductImage.objects.create(product=product, image=image_data)

        return product
