# Posts Management - Frontend

Aplicación React con Redux para la gestión de posts.

## Características

- Insertar posts (name y description)
- Eliminar posts
- Listar posts
- Filtrar posts por noname
- Redux para manejo de estado

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend API corriendo (por defecto en `http://localhost:4000/api`)

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

2. Configurar las variables de entorno:
```bash
cp .env.example .env
```
   
   Editar el archivo `.env` y configurar la URL de tu backend:
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

   **Nota:** En Vite, las variables de entorno deben comenzar con `VITE_` para ser expuestas al cliente.

## Ejecutar la Aplicación

Para ejecutar en modo desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── PostForm/        # Componente para crear posts
│   │   ├── PostFilter/      # Componente para filtrar posts
│   │   └── PostList/        # Componente para listar posts
│   ├── store/
│   │   ├── store.js         # Configuración de Redux store
│   │   └── postsSlice.js    # Slice de Redux para posts
│   ├── services/
│   │   └── api.js           # Servicios API
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── package.json
└── vite.config.js
```

## API Endpoints Esperados

El backend debe exponer los siguientes endpoints:

- `GET /api/posts` - Obtener todos los posts
- `POST /api/posts` - Crear un nuevo post
- `DELETE /api/posts/:id` - Eliminar un post

### Formato de Datos

Los posts deben tener la siguiente estructura (camelCase):

```json
{
  "id": 1,
  "name": "Nombre del post",
  "description": "Descripción del post"
}
```

## Características Técnicas

- **React 18** con hooks
- **Redux Toolkit** para manejo de estado
- **Axios** para peticiones HTTP
- **Vite** como bundler
- **Camel-case** en JSON y JavaScript
- Los posts se cargan una sola vez al iniciar la aplicación
- El filtrado se realiza localmente en el cliente

