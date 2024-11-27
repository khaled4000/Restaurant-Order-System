from django.urls import path
from . import views
urlpatterns =[
    path('getAllFood/',views.getAllFood,name='getAllFood'),
    path('getFoodByName/<str:name>/',views.getFoodByName,name='getFoodByName'),
    path('addFood/',views.addFood,name='addFood'),
    path('deleteFoodByName/<str:name>/',views.deleteFoodByName,name='deleteFoodByName'),
    path('updateFoodByName/<str:name>/',views.updateFoodByName,name='updateFoodByName'),
]