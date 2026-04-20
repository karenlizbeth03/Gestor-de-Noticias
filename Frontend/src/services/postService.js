// Este servicio maneja llamadas a la API para operaciones de posts.
// Proporciona funciones para interactuar con la API backend para posts.

const API_URL = import.meta.env.VITE_API_URL + "/posts";

// Obtener todos
export const getPosts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// obtener un post
export const getPost = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

// Crear
export const createPost = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Actualizar
export const updatePost = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Eliminar
export const deletePost = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};