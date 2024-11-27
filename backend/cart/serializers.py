from rest_framework import serializers
from .models import *


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'user', 'food', 'item_qty')

        extra_kwargs = {
            'user': {'read_only': True},
            'food': {'required': True},
            'item_qty': {'required': True}
        }