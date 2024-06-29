from django.contrib.auth.models import User
from rest_framework import serializers

from nexusapi.models import Cart, Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon']
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'image', 'price', 'quantity', 'width', 'height', 'material', 'color', 'adult', 'category'] 
        depth = 1
        
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity']
        depth = 2
        
class CreateCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity']
        
class UserSerializer(serializers.ModelSerializer):
    cart = CartSerializer(many=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'cart']
        extra_kwargs = {'password': {'write_only': True}}
        depth = 1
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        return user
    
