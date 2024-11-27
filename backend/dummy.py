# Import necessary modules
import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "res_project.settings")
django.setup()

# Import the Food model
from food.models import Food

# Define the dummy data
dummy_food_data = [
    {
        'food_name': 'Hummus',
        'food_star': 4.7,
        'food_vote': 120,
        'food_price': 8.99,
        'food_discount': 0.00,
        'food_description': 'A classic Middle Eastern dip made from chickpeas, tahini, lemon, and garlic.',
        'food_status': 'available',
        'food_type': 'appetizer',
        'food_category': 'Middle Eastern',
        'food_src': 'path/to/hummus.jpg',
    },
    {
        'food_name': 'Falafel Wrap',
        'food_star': 4.5,
        'food_vote': 90,
        'food_price': 10.99,
        'food_discount': 0.00,
        'food_description': 'A delicious wrap filled with crispy falafel balls, veggies, and tahini sauce.',
        'food_status': 'available',
        'food_type': 'main_course',
        'food_category': 'Middle Eastern',
        'food_src': 'path/to/falafel_wrap.jpg',
    },
    # Add more dummy data as needed
]

# Create and save Food instances
for food_data in dummy_food_data:
    food = Food(**food_data)
    food.save()

print("Dummy data added successfully!")
