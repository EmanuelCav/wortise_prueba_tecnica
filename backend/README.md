# Wortise Prueba Técnica: Fullstack Dev Jr. - Backend

El backend está desplegado en **Railway**

## Instalación, Configuración y Ejecución

### Requisitos

- Node.js
- npm
- MongoDB

### 1. Clonar el repositorio

```

git clone https://github.com/EmanuelCav/wortise_prueba_tecnica.git

```

Una vez clonado el repositorio nos dirigimos a la carpeta de la aplicación.

```

cd wortise_prueba_tecnica

```

### 2. Configurar el backend

Dentro del proyecto (dentro de la carpeta wortise_prueba_tecnica) acudimos a configurar el backend.

```

cd backend

```

Dentro de la carpeta del servidor ejecutamos el siguiente comando para instalar todas las dependencias del proyecto.

```

npm install

```

Es necesario completar las variables de entorno (archivo .env) para que el proyecto funcione correctamente:

```env
MONGO_URI=mongodb://localhost:27017/articlesapp
FRONTEND_URL=http://localhost:5173
BETTER_AUTH_SECRET=your-secret-here
PORT=3000
BETTER_AUTH_URL=http://localhost:3000
```

| Variable             | Descripción                      |
| -------------------- | -------------------------------- |
| `MONGO_URI`          | URI de conexión a MongoDB        |
| `FRONTEND_URL`       | URL del frontend                 |
| `BETTER_AUTH_SECRET` | Secret utilizado por Better Auth |
| `PORT`               | Puerto del servidor              |
| `BETTER_AUTH_URL`    | URL del backend                  |

### 3. Iniciar el servidor

Una vez instalado y configurado el backend ejecutamos el siguiente comando para iniciar el servidor.

```

npm run dev

```

## Uso de IA 

Utilicé inteligencia articial para las siguientes funcionalidades:

- Desarrollar algunos pipeline para filtrar la base de datos
- Mejorar algunas validaciones con zod
- Guiarme para configurar better-auth

Usé ChatGPT como herramienta

# Autor

Desarrollado por Emanuel Cavallin.
Wortise Prueba Técnica: Fullstack Dev Jr
