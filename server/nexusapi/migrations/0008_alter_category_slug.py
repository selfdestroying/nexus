# Generated by Django 5.0.6 on 2024-07-23 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nexusapi', '0007_alter_cart_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(null=True),
        ),
    ]