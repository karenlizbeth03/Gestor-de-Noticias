const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/posts", postRoutes);

// Middleware de errores (SIEMPRE al final)
app.use(errorMiddleware);
app.use(errorHandler);

module.exports = app;