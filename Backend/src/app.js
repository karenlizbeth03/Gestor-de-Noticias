// Este archivo configura la aplicación Express, incluyendo middleware y rutas.
// No es el punto de entrada, pero configura la app para ser usada en server.js.

import express from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/posts', postRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;