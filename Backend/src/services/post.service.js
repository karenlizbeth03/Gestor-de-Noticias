let posts = [];

// 📌 OBTENER TODOS
exports.getAllPosts = () => posts;

// 📌 OBTENER UNO
exports.getPostById = (id) => {
  const post = posts.find(p => p.id === id);

  if (!post) {
    const error = new Error("Post no encontrado");
    error.status = 404;
    throw error;
  }

  return post;
};

// 🔍 VALIDADOR SEGURO
const validatePost = (data = {}) => {
  const { title, content, image } = data; // 👈 SIEMPRE DESTRUCTURAR

  let errors = {};

  if (!title || title.trim().length < 3) {
    errors.title = "El título debe tener al menos 3 caracteres";
  }

  if (!content || content.trim().length < 10) {
    errors.content = "El contenido debe tener al menos 10 caracteres";
  }

  if (image && typeof image === "string") {
    try {
      new URL(image);
    } catch {
      errors.image = "La URL de la imagen no es válida";
    }
  }

  return errors;
};

// 📌 CREAR
exports.createPost = (data = {}) => {
  const { title, content, image } = data; // 👈 CLAVE

  const errors = validatePost(data);

  if (Object.keys(errors).length > 0) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = errors;
    throw error;
  }

  const newPost = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    image: image || ""
  };

  posts.push(newPost);

  return newPost;
};

// 📌 ACTUALIZAR
exports.updatePost = (id, data = {}) => {
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    const error = new Error("Post no encontrado");
    error.status = 404;
    throw error;
  }

  const { title, content, image } = data; // 👈 CLAVE

  const errors = validatePost(data);

  if (Object.keys(errors).length > 0) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = errors;
    throw error;
  }

  posts[index] = {
    ...posts[index],
    title: title.trim(),
    content: content.trim(),
    image: image || ""
  };

  return posts[index];
};

// 📌 ELIMINAR
exports.deletePost = (id) => {
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    const error = new Error("Post no encontrado");
    error.status = 404;
    throw error;
  }

  posts.splice(index, 1);
};