from django.db import models
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


class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product')

    def __str__(self):
        return f'{self.product.title} - {self.image}'


