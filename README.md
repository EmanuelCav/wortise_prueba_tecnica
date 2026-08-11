# Wortise Prueba Técnica: Fullstack Dev Jr.

## Demo

**Aplicación:**  
https://wortise-prueba-tecnica.onrender.com

El frontend está desplegado en **Render** y el backend en **Railway**.

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

Ya dentro del proyecto (dentro de la carpeta wortise_prueba_tecnica) acudimos a configurar el backend.

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

### 3. Iniciar el servidor:

Una vez instalado y configurado el backend ejecutamos el siguiente comando para iniciar el servidor.

```

npm run dev

```

### 4. Configurar el frontend

Luego de haber configurado el backend, nos dirigimos nuevamente a la carpeta principal del proyecto para trasladarse a la carpeta frontend.

```

cd frontend

```

Instalamos todas sus dependencias.

```

npm install

```

completamos las variables de entorno (archivo .env) del frontend:

```env
VITE_API_URL=http://localhost:3000
```

| Variable             | Descripción                      |
| -------------------- | -------------------------------- |
| `FRONTEND_URL`       | URL del backend                  |

### 5. Iniciar Vite

Una vez instalado y configurado el frontend ejecutamos el siguiente comando para iniciar el cliente.

```

npm run dev

```

### 6. Abrir la url del frontend en el navegador

Después de haber hecho los pasos anteriores correctamente, ya podemos ejecutar la aplicación.

**Aplicación:**
En desarrollo nos dirigimos a `http://localhost:5173`

En producción navegamos al dominio configurado

## Uso de IA 

Utilicé inteligencia articial para las siguientes funcionalidades:

- Construir el esqueleto de varios componentes para preparar el diseño del frontend
- Desarrollar algunos pipeline para filtrar la base de datos
- Mejorar algunas validaciones con zod
- Guiarme para configurar better-auth
- Utilizar las herramientas de tanstack correctamente

Utilicé ChatGPT

# Autor

Desarrollado por Emanuel Cavallin.
Wortise Prueba Técnica: Fullstack Dev Jr
