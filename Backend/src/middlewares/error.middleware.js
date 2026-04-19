const notFound = (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};

module.exports = (err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor"
  });
};

export default notFound;