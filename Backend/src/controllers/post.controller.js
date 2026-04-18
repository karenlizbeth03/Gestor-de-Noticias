const postService = require("../services/post.service");
const { success } = require("../utils/response");

exports.getPosts = (req, res, next) => {
  try {
    const posts = postService.getAllPosts();
    return success(res, posts);
  } catch (err) {
    next(err);
  }
};

exports.getPost = (req, res, next) => {
  try {
    const post = postService.getPostById(Number(req.params.id));
    return success(res, post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = (req, res, next) => {
  try {
    const post = postService.createPost(req.body);
    return success(res, post, 201);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = (req, res, next) => {
  try {
    const post = postService.updatePost(Number(req.params.id), req.body);
    return success(res, post);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = (req, res, next) => {
  try {
    postService.deletePost(Number(req.params.id));
    return success(res, null, 204);
  } catch (err) {
    next(err);
  }
};