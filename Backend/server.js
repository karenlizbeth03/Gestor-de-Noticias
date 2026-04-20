// Este archivo es el punto de entrada principal del servidor backend.
// Inicializa la aplicación Express, configura middleware, rutas y inicia el servidor.

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import postRoutes from './src/routes/post.routes.js';
import errorHandler from './src/middlewares/errorHandler.js';

const app = express();
const prisma = new PrismaClient();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear cuerpos JSON
app.use(express.json());

// Montar rutas de posts en /api/posts
app.use('/api/posts', postRoutes);

// Manejador de errores global
app.use(errorHandler);

// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});