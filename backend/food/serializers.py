from rest_framework import serializers
from .models import *


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('id','food_name','food_star','food_vote','food_price','food_discount','food_description','food_status','food_type','food_category','food_src')

        extra_kwargs = {
            'food_name': {'required': True},
            'food_star': {'required': True},
            'food_vote': {'required': True},
            'food_price': {'required': True},
            'food_discount': {'required': True},
            'food_description': {'required': True},
            'food_status': {'required': True},
            'food_type': {'required': True},
            'food_category': {'required': True},
            'food_src': {'required': False},
        }
