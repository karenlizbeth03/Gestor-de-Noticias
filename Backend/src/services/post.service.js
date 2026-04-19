import * as postRepository from "../repositories/post.repository.js";

export const getPosts = () => postRepository.findAll();

export const getPost = (id) => postRepository.findById(id);

export const getPostBySlug = (slug) => postRepository.findBySlug(slug);

export const createPost = async (data) => {
  const existing = await postRepository.findBySlug(data.slug);
  if (existing) {
    const error = new Error("Slug ya existe");
    error.status = 409;
    throw error;
  }
  return postRepository.create(data);
};

export const updatePost = async (id, data) => {
  return postRepository.update(id, data);
};

export const deletePost = (id) => postRepository.remove(id);

export const validatePost = ({ title, content, image }) => {
  const errors = [];
  if (!title || !title.trim()) errors.push("El título es obligatorio");
  if (!content || !content.trim()) errors.push("El contenido es obligatorio");
  if (image && typeof image !== "string") errors.push("La URL de la imagen no es válida");
  return errors;
};