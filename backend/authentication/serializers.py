from rest_framework import serializers
from .models import User


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email','password','phone_number')
        extra_kwargs = {
            'username': {'required': True,'allow_blank': False}, # 'allow_blank': False means 'username' field can't be empty
            'password': {'write_only': True, 'required': True,'allow_blank': False,'min_length':8},
            'email': {'required': True,'allow_blank': False},
            'phone_number': {'required': True,'allow_blank': False}
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email','phone_number')