from rest_framework import serializers
from .models import BillStatus

class BillStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillStatus
        fields = ('id','user_id', 'bill_address', 'bill_discount', 'bill_delivery', 'bill_total', 'bill_status', 'bill_phone', 'bill_when', 'bill_method')

        extra_kwargs = {
            'bill_method': {'required': True},
            'bill_paid': {'required': False},
            'bill_address': {'required': False},
            'bill_discount': {'required': False},
            'bill_delivery': {'required': False},
            'bill_total': {'required': False},
            'bill_status': {'required': True},
            'bill_phone': {'required': False},
            'bill_when': {'required': False},
            'bill_method': {'required': False},
        }