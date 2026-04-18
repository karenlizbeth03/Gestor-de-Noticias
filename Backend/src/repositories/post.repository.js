const Post = require("../models/post.model");

let posts = [];
let idCounter = 1;

/**
 * Simula una base de datos en memoria
 */
class PostRepository {
  findAll() {
    return posts;
  }

  findById(id) {
    return posts.find(p => p.id === id);
  }

  create(data) {
    const newPost = new Post({
      id: idCounter++,
      ...data
    });

    posts.push(newPost);
    return newPost;
  }

  update(id, data) {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    posts[index] = { ...posts[index], ...data };
    return posts[index];
  }

  delete(id) {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;

    posts.splice(index, 1);
    return true;
  }
}

module.exports = new PostRepository();