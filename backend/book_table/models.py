from django.db import models
from authentication.models import User
# Create your models here.


class BookTable(models.Model):
    book_people = models.IntegerField()
    book_tables = models.IntegerField()
    book_note = models.CharField(max_length = 255)
    book_name = models.CharField(max_length = 255)
    book_phone = models.CharField(max_length = 255)
    user_id = models.ForeignKey(User, on_delete = models.CASCADE)
    book_when = models.DateTimeField()

    def __str__ (self):
        return self.book_name