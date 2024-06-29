# Generated by Django 5.0.6 on 2024-06-23 19:41

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
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('slug', models.SlugField()),
                ('icon', models.ImageField(upload_to='category_icons/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('slug', models.SlugField()),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='product_images/')),
                ('price', models.FloatField()),
                ('quantity', models.IntegerField()),
                ('width', models.FloatField()),
                ('height', models.FloatField()),
                ('material', models.TextField(choices=[('plastic', 'Plastic'), ('metal', 'Metal'), ('ceramic', 'Ceramic'), ('wood', 'Wood'), ('other', 'Other')], max_length=255)),
                ('color', models.TextField(choices=[('black', 'Black'), ('white', 'White'), ('red', 'Red'), ('green', 'Green'), ('blue', 'Blue'), ('yellow', 'Yellow'), ('orange', 'Orange'), ('purple', 'Purple'), ('pink', 'Pink'), ('brown', 'Brown'), ('gray', 'Gray')], max_length=255)),
                ('adult', models.BooleanField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='nexusapi.category')),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart', to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart', to='nexusapi.product')),
            ],
        ),
    ]
