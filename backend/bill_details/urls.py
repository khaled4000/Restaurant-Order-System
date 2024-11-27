from django.urls import path
from . import views

urlpatterns =[
    path('create/', views.createBillDetails, name='createBillDetails'),
    path('get/', views.getBillDetails, name='getBillDetails'),
]