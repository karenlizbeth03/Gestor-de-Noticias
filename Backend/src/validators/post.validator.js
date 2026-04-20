// Este validador usa Joi para validar datos de posts.
// Define el esquema para creación y actualización de posts.

exports.validatePost = (req, res, next) => {
  const { title, content, image } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "El título debe tener al menos 3 caracteres"
    });
  }

  if (!content || content.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "El contenido debe tener al menos 10 caracteres"
    });
  }
  if (image && !image.startsWith("http")) {
  return res.status(400).json({
    success: false,
    errors: {
      image: "La URL de la imagen no es válida"
    }
  });
}

  next();
};