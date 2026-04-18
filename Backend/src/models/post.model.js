/**
 * Modelo de Post
 * Define la estructura de una publicación
 */
class Post {
  constructor({ id, title, content, image }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.image = image || null;
  }
}

module.exports = Post;