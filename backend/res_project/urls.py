
from django.contrib import admin
from django.urls import path , include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('food/',include('food.urls')),
    path('auth/',include('authentication.urls')),
    path('cart/',include('cart.urls')),
    path('book_table/',include('book_table.urls')),
    path('bill_details/',include('bill_details.urls')),
    path('bill_status/',include('bill_status.urls')),
]
