# Gestor de Noticias

Una aplicación para gestionar noticias, con backend y frontend separados.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, Prisma ORM, PostgreSQL
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, React Router, i18next (para internacionalización)
- **Despliegue**: Backend en Render, Frontend en Vercel

## Requisitos Previos

- Node.js (versión 16 o superior)
- PostgreSQL (base de datos)
- Git

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Gestor-de-Noticias
```

### Subir a GitHub

Si aún no has subido el proyecto a GitHub:

1. Crea un nuevo repositorio en [GitHub](https://github.com/new).
2. Inicializa git si no está hecho:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Agrega el remoto:

   ```bash
   git remote add origin <URL_DEL_REPOSITORIO>
   git push -u origin main
   ```

### 2. Configuración del Backend

1. Navega a la carpeta del backend:

   ```bash
   cd Backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la carpeta `Backend` con el siguiente contenido:

   ```
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"
   PORT=3000
   ```

   Asegúrate de tener PostgreSQL corriendo y reemplaza con tus credenciales.

4. Ejecuta las migraciones de Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Genera el cliente de Prisma:

   ```bash
   npx prisma generate
   ```

6. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   El backend estará disponible en `http://localhost:3000`.

### 3. Configuración del Frontend

1. Navega a la carpeta del frontend:

   ```bash
   cd ../Frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

## Estructura del Proyecto

```
Gestor-de-Noticias/
├── Backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── validators/
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   ├── hooks/
    │   └── styles/
    ├── package.json
    ├── tsconfig.json
    └── vercel.json
```

## Despliegue

### Frontend en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com).
2. Conecta tu repositorio de GitHub.
3. Vercel detectará automáticamente la configuración en `vercel.json` y desplegará el frontend.

### Backend en Render

1. Crea una cuenta en [Render](https://render.com).
2. Crea un nuevo servicio web.
3. Conecta tu repositorio de GitHub.
4. Configura las variables de entorno (DATABASE_URL, etc.).
5. El comando de inicio es `npm start`.

## Uso

- Accede al frontend en el navegador.
- Crea, edita y visualiza noticias.
- El backend proporciona la API REST para las operaciones CRUD de las noticias.

## Contribución

1. Haz un fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Traducción de la interfaz

La aplicación usa la API de OpenRouter para traducir los textos de la página. Esta API se utiliza porque ofrece una opción gratuita, pero tiene un límite de tokens mensuales.

### Variables de entorno

La clave de OpenRouter se debe configurar en el entorno como variable de entorno, por ejemplo:

- `OPENROUTER_API_KEY`

No debes subir esta clave al repositorio.

### Vercel

En Vercel también debes añadir la misma variable de entorno `OPENROUTER_API_KEY` en la configuración del proyecto para que la traducción funcione en producción.

### Consideraciones

- OpenRouter es gratuita hasta cierto límite de tokens.
- Si se supera ese límite, la funcionalidad de traducción puede dejar de funcionar hasta el siguiente ciclo de facturación.
- Mantén la clave segura y fuera del código fuente.