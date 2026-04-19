export const notFound = (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Error interno"
  });
};

export default errorHandler;