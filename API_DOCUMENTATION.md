# Documentación API REST - Gestión de Libros

## Información General

**Base URL**: `http://localhost:3200/api`  
**Tipo**: API RESTful para gestión de libros  
**Base de Datos**: SQLite con Sequelize ORM  
**Arquitectura**: Node.js + Express + JavaScript modularizado (ES6)

## Endpoints Disponibles

### 1. CRUD Básico

#### GET /api/ - Obtener todos los libros
**Método**: `GET`  
**URL**: `/api/`  
**Respuesta**:
```json
{
  "state": true,
  "data": [
    {
      "id": 1,
      "title": "Don Quijote de la Mancha",
      "author": "Miguel de Cervantes",
      "isbn": "978-84-376-0494-7",
      "publicationYear": 1605,
      "pages": 863,
      "price": 25.99,
      "genre": "Novela",
      "publisher": "Editorial Planeta"
    }
  ]
}
```

#### GET /api/:id - Obtener libro por ID
**Método**: `GET`  
**URL**: `/api/1`  
**Respuesta**:
```json
{
  "state": true,
  "data": {
    "id": 1,
    "title": "Don Quijote de la Mancha",
    "author": "Miguel de Cervantes",
    "isbn": "978-84-376-0494-7",
    "publicationYear": 1605,
    "pages": 863,
    "price": 25.99,
    "genre": "Novela",
    "publisher": "Editorial Planeta"
  }
}
```

#### POST /api/ - Crear nuevo libro
**Método**: `POST`  
**URL**: `/api/`  
**Headers**: `Content-Type: application/json`  
**Body**:
```json
{
  "title": "Cien años de soledad",
  "author": "Gabriel García Márquez",
  "isbn": "978-84-376-0495-4",
  "publicationYear": 1967,
  "pages": 471,
  "price": 22.50,
  "genre": "Realismo mágico",
  "publisher": "Editorial Sudamericana"
}
```

#### PUT /api/:id - Actualizar libro
**Método**: `PUT`  
**URL**: `/api/1`  
**Headers**: `Content-Type: application/json`  
**Body**:
```json
{
  "title": "Don Quijote de la Mancha (Edición Especial)",
  "price": 29.99
}
```

#### DELETE /api/:id - Eliminar libro
**Método**: `DELETE`  
**URL**: `/api/1`  
**Respuesta**:
```json
{
  "state": true,
  "message": "El libro con ID 1 ha sido eliminado correctamente",
  "deletedId": "1"
}
```

### 2. Búsquedas por Criterios Numéricos

#### GET /api/search/year - Buscar por año de publicación
**Método**: `GET`  
**URL**: `/api/search/year?year=2000&operator=gt`  
**Parámetros**:
- `year`: Año de publicación
- `operator`: `gt` (mayor), `lt` (menor), `gte` (mayor igual), `lte` (menor igual), o sin operador (igual)

**Ejemplo**: `/api/search/year?year=1950&operator=gte` (libros de 1950 en adelante)

#### GET /api/search/pages - Buscar por número de páginas
**Método**: `GET`  
**URL**: `/api/search/pages?pages=500&operator=lt`  
**Parámetros**:
- `pages`: Número de páginas
- `operator`: `gt` (mayor), `lt` (menor), `gte` (mayor igual), `lte` (menor igual), o sin operador (igual)

**Ejemplo**: `/api/search/pages?pages=300&operator=gt` (libros con más de 300 páginas)

### 3. Operaciones Agrupadas

#### GET /api/stats/price - Estadísticas de precios
**Método**: `GET`  
**URL**: `/api/stats/price`  
**Respuesta**:
```json
{
  "state": true,
  "data": {
    "totalPrice": 156.47,
    "averagePrice": 26.08,
    "totalBooks": 6,
    "minPrice": 18.99,
    "maxPrice": 35.50
  }
}
```

#### GET /api/stats/pages - Estadísticas de páginas
**Método**: `GET`  
**URL**: `/api/stats/pages`  
**Respuesta**:
```json
{
  "state": true,
  "data": {
    "totalPages": 2847,
    "averagePages": 474.5,
    "totalBooks": 6,
    "minPages": 245,
    "maxPages": 863
  }
}
```

## Códigos de Estado HTTP

- `200`: Operación exitosa
- `201`: Recurso creado exitosamente
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

## Formato de Respuesta de Error

```json
{
  "state": false,
  "error": "Descripción del error"
}
```

## Comandos Docker

### Construir imagen Docker:
```bash
docker build -t books-api .
```

### Ejecutar contenedor:
```bash
docker run -p 3200:3200 books-api
```

### Subir a DockerHub:
```bash
docker tag books-api tu-usuario/books-api
docker push tu-usuario/books-api
```

## Ejemplo de Datos de Prueba

```json
[
  {
    "title": "Don Quijote de la Mancha",
    "author": "Miguel de Cervantes",
    "isbn": "978-84-376-0494-7",
    "publicationYear": 1605,
    "pages": 863,
    "price": 25.99,
    "genre": "Novela",
    "publisher": "Editorial Planeta"
  },
  {
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "isbn": "978-84-376-0495-4",
    "publicationYear": 1967,
    "pages": 471,
    "price": 22.50,
    "genre": "Realismo mágico",
    "publisher": "Editorial Sudamericana"
  }
]
```