from django.contrib.auth.models import User
from nexusapi.models import Cart, Category, Product
from nexusapi.serializers import (
    CartSerializer,
    CategorySerializer,
    CreateCartSerializer,
    ProductSerializer,
    UserSerializer,
)
from rest_framework import generics, pagination, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None

    
    
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = pagination.LimitOffsetPagination

    def get_queryset(self):
        slug = self.request.query_params.get('category_slug')
        if slug:
            products = Product.objects.filter(category__slug=slug)
        else:
            products = Product.objects.all()
        price = self.request.query_params.get('price')
        if price:
            price = price.split('-')
            price_from = price[0]
            price_to = price[1]
            products = products.filter(price__range=(price_from, price_to))
        width = self.request.query_params.get('width')
        if width:
            width = width.split('-')
            width_from = width[0]
            width_to = width[1]
            products = products.filter(width__range=(width_from, width_to))
        height = self.request.query_params.get('height')
        if height:
            height = height.split('-')
            height_from = height[0]
            height_to = height[1]
            products = products.filter(height__range=(height_from, height_to)) 
                
        material = self.request.query_params.get('material')
        if material:
            material = material.split('-')
            products = products.filter(material__in=material)
        adult = self.request.query_params.get('adult')
        if adult:
            products = products.filter(adult=bool(int(adult)))
        return products
        
        


class LoginApiView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



class ProductByCategory(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = pagination.LimitOffsetPagination
    lookup_field = 'slug'
    
    
    def get_queryset(self):
        return Product.objects.filter(category__slug=self.kwargs['slug'])

class RegistrationApiView(generics.CreateAPIView):

    def post(self, request):

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            
            user = serializer.create(serializer.validated_data)
            user.save()
            
            refresh = RefreshToken.for_user(user) # Создание Refesh и Access

            refresh.payload.update({    # Полезная информация в самом токене

                'user_id': user.id,

                'username': user.username

            })

            return Response({

                'refresh': str(refresh),

                'access': str(refresh.access_token), # Отправка на клиент

            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CartUpdateApiView(generics.UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticated]
    
class CartDeleteApiView(generics.DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticated]
    
class CartCreateApiView(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CreateCartSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)