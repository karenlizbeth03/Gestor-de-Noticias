import * as postService from "../services/post.service.js";
import { generateSlug } from "../utils/slug.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json({ data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPost(req.params.id);
    if (!post) return res.status(404).json({ error: "Noticia no encontrada" });
    res.status(200).json({ data: post });
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await postService.getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: "Noticia no encontrada" });
    res.status(200).json({ data: post });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const errors = postService.validatePost({ title, content, image });
    if (errors.length) return res.status(400).json({ errors });

    const slug = generateSlug(title);
    const created = await postService.createPost({ title, content, image, slug });

    res.status(201).json({ data: created });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const errors = postService.validatePost({ title, content, image });
    if (errors.length) return res.status(400).json({ errors });

    const slug = generateSlug(title);
    const updated = await postService.updatePost(req.params.id, { title, content, image, slug });

    res.status(200).json({ data: updated });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).json({ data: null, message: "Noticia eliminada" });
  } catch (error) {
    next(error);
  }
};