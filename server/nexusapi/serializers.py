from django.contrib.auth.models import User
from nexusapi.models import Cart, Category, Product
from rest_framework import serializers


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
    direction = serializers.IntegerField(allow_null=True)
    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity', 'direction']
        depth = 2 
    
    
    def update(self, instance, validated_data):
        print(validated_data)

        direction = validated_data['direction']
        if direction == 1:
            Product.objects.filter(id=instance.product.id).update(quantity=instance.product.quantity - 1)
        elif direction == -1:
            Product.objects.filter(id=instance.product.id).update(quantity=instance.product.quantity + 1)
        return super().update(instance, validated_data)
    
        
class CreateCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity']
        
    def create(self, validated_data):
        print(validated_data)
        Product.objects.filter(id=validated_data['product'].id).update(quantity=validated_data['product'].quantity - 1)
        return Cart.objects.create(**validated_data)
        
class UserSerializer(serializers.ModelSerializer):
    cart = CartSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'cart']
        extra_kwargs = {'password': {'write_only': True}}
        depth = 1
    
    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     if instance.is_authenticated:
    #         data['cart'] = CartSerializer(instance.cart, many=True).data
    #     return data
    
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        return user
    
