from django.db import models
import base64

# Create your models here.
class Libro(models.Model):
    titulo = models.CharField(max_length=255)
    autor = models.CharField(max_length=255)
    paginas = models.IntegerField()
    editorial = models.CharField(max_length=50)

    # CAMPO PARA GUARDAR LA IMAGEN EN EL BACK
    # upload_to='imagenes-libros/' creará una carpeta llamada "imagenes-libros" dentro del directorio "media"
    foto = models.ImageField(upload_to='imagenes-libros/', blank=True, null=True)
    