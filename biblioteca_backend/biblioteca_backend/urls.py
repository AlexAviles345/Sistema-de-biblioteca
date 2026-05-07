from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('api/', include('libros.urls')),

    # Ruta para obtener el esquema OpenAPI de la API, que es utilizado por las vistas de documentación
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Ruta para la documentación interactiva Swagger UI, que consume el esquema OpenAPI generado por SpectacularAPIView
    path(
        'api/docs/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui'
    ),

    # Ruta para la documentación interactiva ReDoc, que también consume el esquema OpenAPI generado por SpectacularAPIView
    path(
        'api/redoc/',
        SpectacularRedocView.as_view(url_name='schema'),
        name='redoc'
    ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )