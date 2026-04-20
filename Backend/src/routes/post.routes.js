// Este archivo define las rutas para endpoints relacionados con posts.
// Mapea métodos HTTP y rutas a funciones del controlador.


import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostBySlug,
  updatePost,
  deletePost
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
