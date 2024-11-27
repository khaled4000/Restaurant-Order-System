from rest_framework import serializers
from .models import BookTable

class BookTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTable
        fields = ('id','book_people', 'book_tables', 'book_note', 'book_name', 'book_phone', 'user_id', 'book_when')