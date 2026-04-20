// Este middleware maneja errores globalmente para la aplicación.
// Captura errores y envía una respuesta de error estandarizada.

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Error interno del servidor"
  });
};

export default errorHandler;