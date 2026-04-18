import { Link } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  return (
    <div className="card">
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 80)}...</p>

      <Link to={`/post/${post.id}`}>Ver más</Link>
      <Link to={`/edit/${post.id}`}>Editar</Link>
      <button onClick={() => onDelete(post.id)}>Eliminar</button>
    </div>
  );
}