# Generated by Django 5.0.6 on 2024-06-23 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nexusapi', '0002_alter_product_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
