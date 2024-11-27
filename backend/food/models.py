from django.db import models
# food models

class Food(models.Model):
    food_name = models.CharField(max_length=255)
    food_star = models.DecimalField(max_digits=3, decimal_places=2)
    food_vote = models.IntegerField()
    food_price = models.DecimalField(max_digits=8, decimal_places=2)
    food_discount = models.DecimalField(max_digits=5, decimal_places=2)
    food_description = models.CharField(max_length=255)
    
    FOOD_STATUS_CHOICES = [
        ('available', 'Available'),
        ('sold_out', 'Sold Out'),
        ('coming_soon', 'Coming Soon'),
    ]
    food_status = models.CharField(max_length=20, choices=FOOD_STATUS_CHOICES)

    FOOD_TYPE_CHOICES = [
        ('appetizer', 'Appetizer'),
        ('main_course', 'Main Course'),
        ('dessert', 'Dessert'),
    ]
    food_type = models.CharField(max_length=20, choices=FOOD_TYPE_CHOICES)

    food_category = models.CharField(max_length=255)
    food_src = models.ImageField(upload_to='food_images/')  # Assuming it's an image URL or path

    def __str__(self):
        return self.food_name
    
    

    