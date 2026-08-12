# Wortise Prueba Técnica: Fullstack Dev Jr. - Frontend

## Demo

**Aplicación:**  
https://wortise-prueba-tecnica.onrender.com

El frontend está desplegado en **Render**.

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

### 2. Configurar el frontend

Dentro del proyecto (dentro de la carpeta wortise_prueba_tecnica) acudimos a configurar el frontend.

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
| `VITE_API_URL`       | URL del backend                  |

### 3. Iniciar Vite

Una vez instalado y configurado el frontend ejecutamos el siguiente comando para iniciar el cliente en Vite.

```

npm run dev

```

### 4. Abrir la url del frontend en el navegador

Después de haber hecho los pasos anteriores correctamente, ya podemos ejecutar la aplicación.

**Aplicación:**
En desarrollo nos dirigimos a `http://localhost:5173`

En producción navegamos al dominio configurado

## Uso de IA 

Utilicé inteligencia articial para las siguientes funcionalidades:

- Construir el esqueleto de varios componentes para preparar el diseño del frontend
- Mejorar algunas validaciones con zod
- Guiarme para configurar better-auth
- Utilizar las herramientas de tanstack correctamente

Usé ChatGPT como herramienta

# Autor

Desarrollado por Emanuel Cavallin.
Wortise Prueba Técnica: Fullstack Dev Jr