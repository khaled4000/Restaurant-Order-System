from rest_framework import serializers
from .models import BillDetails


class BillDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillDetails
        fields = '__all__'

    extra_kwargs = {
        'bill_id': {'required': True},
        'food_id': {'required': True},
        'item_qty': {'required': True}
    }