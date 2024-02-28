from django.urls import path
from .views import ProductCreateAPIview, CommentAPIview, CommentEditAPIview, ProductFullInfoAPIView, ProductEditAPIView, \
    ProductListAPIview

urlpatterns = [
    path('create/', ProductCreateAPIview.as_view(), name=''),
    path('comments/', CommentAPIview.as_view(), name='comments'),
    path('comments/<int:pk>/', CommentEditAPIview.as_view(), name='comments_edit'),
    path('details/<int:pk>/', ProductFullInfoAPIView.as_view(), name='product_full_info'),
    path('edit/<int:pk>/', ProductEditAPIView.as_view(), name='product_edit')
]
