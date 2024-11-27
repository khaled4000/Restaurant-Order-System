from django.urls import path
from . import views

urlpatterns =[
    path('addFoodToCart/', views.addFoodToCart, name='addFoodToCart'),
    path('getFoodInCart/', views.getFoodInCart, name='getFoodInCart'),
    path('deleteFoodFromCart/<str:pk>/', views.deleteFoodFromCart, name='deleteFoodFromCart'),
    path('deleteAllFoodFromCart/', views.deleteAllFoodFromCart, name='deleteAllFoodFromCart'),
    path('updateFoodQuantity/<str:pk>/', views.updateFoodQuantity, name='updateFoodQuantityInCart'),
    path('getTotalPrice/', views.getTotalPrice, name='getTotalAmount'),
]