from django.db import models
from authentication.models import User


class BillStatus(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    bill_address = models.CharField(max_length=255)
    bill_discount = models.IntegerField()
    bill_delivery = models.IntegerField()
    bill_total = models.IntegerField()
    bill_status = models.CharField(max_length=255)
    bill_phone = models.CharField(max_length=255)
    bill_when = models.DateTimeField()
    bill_method = models.CharField(max_length = 255)
    # BILL_METHOD_CHOICES = [
    #     ('cash', 'Cash'),
    #     ('card', 'Card')
    # ]
    # BILL_PAID_CHOICES = [
    #     ('paid', 'Paid'),
    #     ('unpaid', 'Unpaid')
    #     ]
    # def __str__ (self):
    #     return self.username
    