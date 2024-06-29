"""
URL configuration for nexus project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from nexusapi.views import (
    CartCreateApiView,
    CartDeleteApiView,
    CartUpdateApiView,
    CategoryViewSet,
    LoginApiView,
    ProductViewSet,
    RegistrationApiView,
)
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('products', ProductViewSet, basename='products')
router.register('categories', CategoryViewSet, basename='categories')




urlpatterns = [
    path('admin/', admin.site.urls),
    # path("api/", include("rest_framework.urls", namespace="rest_framework")),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', LoginApiView.as_view(), name='login'),
    path('api/register', RegistrationApiView.as_view(), name='register'),
    path('api/cart/create/', CartCreateApiView().as_view(), name='cart_create'),
    path('api/cart/<int:pk>/update/', CartUpdateApiView().as_view(), name='cart_update'),
    path('api/cart/<int:pk>/delete/', CartDeleteApiView().as_view(), name='cart_delete'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
