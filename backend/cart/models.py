from django.db import models
from authentication.models import User
from food.models import Food
from django.contrib.auth import get_user_model
# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    item_qty = models.IntegerField()

    def __str__(self):
        return self.food.food_name