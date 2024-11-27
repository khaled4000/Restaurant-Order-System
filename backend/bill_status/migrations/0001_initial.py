# Generated by Django 5.0.4 on 2024-04-20 12:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BillStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bill_address', models.CharField(max_length=255)),
                ('bill_discount', models.IntegerField()),
                ('bill_delivery', models.IntegerField()),
                ('bill_total', models.IntegerField()),
                ('bill_status', models.CharField(max_length=255)),
                ('bill_phone', models.CharField(max_length=255)),
                ('bill_when', models.DateTimeField()),
                ('bill_method', models.CharField(max_length=255)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
