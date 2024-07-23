from django import forms
from django.contrib import admin
from nexusapi.models import Cart, Category, Product
from nexusapi.svg_image_field import SVGAndImageFormField


class SVGAndImageForm(forms.ModelForm):
    icon = SVGAndImageFormField(allow_empty_file=True,required=False)

    class Meta:
        model = Category
        fields = '__all__'
        
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    fields = ['name', 'icon']
    list_display = ['name', 'slug', 'icon']
    form = SVGAndImageForm

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['slug']
    list_display = ['name', 'price', 'width', 'height', 'material', 'color', 'adult', 'category']
    

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'product', 'quantity']
    