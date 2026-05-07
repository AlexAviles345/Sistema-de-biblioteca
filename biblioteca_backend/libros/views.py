from django.shortcuts import render

from rest_framework import viewsets
from .models import Libro 
from .serializers import LibroSerializer

# Encargado de manejar las operaciones CRUD para el modelo Libro
class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
