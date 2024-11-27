from django.db import models
from bill_status.models import BillStatus
from food.models import Food


class BillDetails(models.Model):
    bill_id = models.ForeignKey(BillStatus, on_delete = models.CASCADE)
    food_id = models.ForeignKey(Food, on_delete = models.CASCADE)
    item_qty = models.IntegerField()

    # def __str__ (self):
    #     return self.bill_id