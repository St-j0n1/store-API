from django.contrib import admin
from .models import Product, Category, ProductImageUrl, Comments, Likes


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(ProductImageUrl)
admin.site.register(Comments)
admin.site.register(Likes)

