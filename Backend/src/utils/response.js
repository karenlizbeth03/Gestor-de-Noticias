// Esta utilidad proporciona funciones para estandarizar respuestas de API.
// Incluye helpers para respuestas de éxito y error.

exports.success = (res, data, status = 200) => {
  res.status(status).json({
    success: true,
    data,
  });
};

exports.error = (res, message, status = 400) => {
  res.status(status).json({
    success: false,
    message,
  });
};