from django.db import models
from django.utils.text import slugify

from user_app.models import User


class Category(models.Model):
    category_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.category_name


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    color = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    on_sale = models.BooleanField(default=False)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f' {self.id} - {self.title} - {self.on_sale}'


class ProductImageUrl(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='product')
    url = models.URLField()
    alt = models.CharField(max_length=255, null=True, blank=True, verbose_name='alt')

    def __str__(self):
        return f'{self.product} - {self.product.category}'


class Comments(models.Model):
    comment = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='commented_product')

    def __str__(self):
        return f'{self.id} - {self.comment}'


class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='user')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='liked_product')
