from django.urls import path
from . import views

urlpatterns =[
    path('create/', views.createBookTable, name='createBookTable'),
    path('get/', views.getBookTable, name='getBookTable'),
    path('get/<str:pk>/', views.getBookTableById, name='getBookTableById'),
    path('delete/<str:pk>/', views.deleteBookTable, name='deleteBookTable'),
]