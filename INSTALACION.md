# Instalacion del sistema de biblioteca

Sistema web para gestionar libros, con backend en Django REST Framework y frontend en React + Vite.

## Requisitos previos

- Python 3.10+
- MySQL 8+ (o MariaDB)
- Node.js 18+
- npm 9+

## Estructura del repositorio

```text
/
|- biblioteca_backend/
|  |- manage.py
|  |- requirements.txt
|  |- .env.example
|  |- biblioteca_backend/
|  |- libros/
|  |- media/
|- biblioteca_frontend/
|  |- package.json
|  |- .env.example
|  |- src/
|- README.md
|- INSTALACION.md
```

## Puesta en marcha local

### 1) Crear base de datos MySQL

Crea una base de datos vacia y asigna usuario/permiso acorde a tus credenciales de entorno.

Ejemplo:

```sql
CREATE DATABASE biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2) Backend (Django)

1. Abrir terminal en la carpeta backend:
   - cd biblioteca_backend
2. Crear y activar un entorno virtual:
   - python -m venv .venv
   - Windows: .venv\Scripts\activate
   - macOS/Linux: source .venv/bin/activate
3. Instalar dependencias:
   - pip install -r requirements.txt
4. Crear archivo .env desde el ejemplo:
   - Windows: copy .env.example .env
   - macOS/Linux: cp .env.example .env
5. Editar .env con tus valores:

```env
DB_NAME=biblioteca
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=3306

SECRET_KEY=tu_secret_key_django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

6. Aplicar migraciones:
   - python manage.py migrate
7. Ejecutar el servidor:
   - python manage.py runserver

Backend: http://localhost:8000

### 3) Frontend (React + Vite)

1. Abrir terminal en la carpeta frontend:
   - cd biblioteca_frontend
2. Instalar dependencias:
   - npm install
3. Crear archivo .env desde el ejemplo:
   - Windows: copy .env.example .env
   - macOS/Linux: cp .env.example .env
4. Configurar la URL del backend:

```env
VITE_API_URL=http://localhost:8000/api
```

5. Ejecutar el servidor de desarrollo:
   - npm run dev

Frontend: http://localhost:5173

## Verificacion rapida

- API libros: http://localhost:8000/api/libro/
- Swagger/OpenAPI: http://localhost:8000/api/docs/
- OpenAPI JSON: http://localhost:8000/api/schema/
- ReDoc: http://localhost:8000/api/redoc/

## Notas

- Las imagenes se guardan en biblioteca_backend/media.
- Si el frontend corre en otro puerto, agrega el origen en CORS_ALLOWED_ORIGINS.
- El backend carga variables desde .env usando python-decouple.
