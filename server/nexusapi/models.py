from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(blank=True)
    icon = models.ImageField(upload_to='category_icons/', null=True, blank=True, default='category_icons/placeholder.svg')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
class Product(models.Model):
    class Materials(models.TextChoices):
        PLASTIC = 'plastic'
        METAL = 'metal'
        CERAMIC = 'ceramic'
        WOOD = 'wood'
        OTHER = 'other'
    class Colors(models.TextChoices):
        BLACK = 'black'
        WHITE = 'white'
        RED = 'red'
        GREEN = 'green'
        BLUE = 'blue'
        YELLOW = 'yellow'
        ORANGE = 'orange'
        PURPLE = 'purple'
        PINK = 'pink'
        BROWN = 'brown'
        GRAY = 'gray'
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='product_images/', null=True, default='product_images/placeholder.jpg')
    price = models.FloatField()
    quantity = models.IntegerField(null=True, default=1)
    width = models.FloatField()
    height = models.FloatField()
    material = models.TextField(max_length=255, choices=Materials.choices)
    color = models.TextField(max_length=255, choices=Colors.choices)
    adult = models.BooleanField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart')
    quantity = models.IntegerField()