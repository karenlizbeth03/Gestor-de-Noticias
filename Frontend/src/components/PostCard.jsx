import { Link } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  return (
    <div className="card">
      {post.image && (
        <img src={post.image} alt={post.title} className="card-img" />
      )}

      <div className="card-body">
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}...</p>

        <div className="card-actions">
          <Link to={`/post/${post.id}`}>Ver</Link>
          <Link to={`/edit/${post.id}`}>Editar</Link>
          <button onClick={() => onDelete(post.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}