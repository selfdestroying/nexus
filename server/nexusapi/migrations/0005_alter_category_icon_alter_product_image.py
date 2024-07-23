# Generated by Django 5.0.6 on 2024-06-23 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nexusapi', '0004_alter_product_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='icon',
            field=models.ImageField(null=True, upload_to='category_icons/'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(null=True, upload_to='product_images/'),
        ),
    ]