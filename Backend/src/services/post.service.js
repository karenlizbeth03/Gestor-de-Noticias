const postRepository = require("../repositories/post.repository");

class PostService {
  getAllPosts() {
    return postRepository.findAll();
  }

  getPostById(id) {
    const post = postRepository.findById(id);
    if (!post) {
      const error = new Error("Post no encontrado");
      error.status = 404;
      throw error;
    }
    return post;
  }

  createPost(data) {
    return postRepository.create(data);
  }

  updatePost(id, data) {
    const updated = postRepository.update(id, data);

    if (!updated) {
      const error = new Error("Post no encontrado");
      error.status = 404;
      throw error;
    }

    return updated;
  }

  deletePost(id) {
    const deleted = postRepository.delete(id);

    if (!deleted) {
      const error = new Error("Post no encontrado");
      error.status = 404;
      throw error;
    }
  }
}

module.exports = new PostService();