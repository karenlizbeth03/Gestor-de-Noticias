const express = require("express");
const router = express.Router();

const controller = require("../controllers/post.controller");
const { validatePost } = require("../validators/post.validator");

router.get("/", controller.getPosts);
router.get("/:id", controller.getPost);
router.post("/", validatePost, controller.createPost);
router.put("/:id", validatePost, controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;