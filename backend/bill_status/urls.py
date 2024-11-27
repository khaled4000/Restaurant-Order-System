from django.urls import path
from . import views

urlpatterns =[
    path('create/', views.createBillStatus, name='createBillStatus'),
    path('get/', views.getBillStatus, name='getBillStatus'),
    path('get/<str:pk>/', views.getBillStatusById, name='getBillStatusById'),
    path('update/<str:pk>/', views.updateBillStatus, name='updateBillStatus'),
    path('cancel/<str:pk>/', views.cancelBillStatusByUser, name='cancelBillStatus'),
    path('send/', views.sendBillStatus, name='sendBillStatus'),
    path('delete/', views.cancelBillStatus, name='deleteBillStatus')
]