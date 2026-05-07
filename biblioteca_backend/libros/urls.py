from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LibroViewSet

# Creacion del router y registro de la vista LibroViewSet
router = DefaultRouter()
router.register(r'libro', LibroViewSet, basename='libros')

urlpatterns = [
    # Se incluyen todas las rutas generadas por el router para el modelo Libro
    path('', include(router.urls)), 
]
