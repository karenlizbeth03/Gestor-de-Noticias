import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Importa iconos

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
          <Link to={`/post/${post.id}`}><FaEye /> Ver</Link> {/* Agrega FaEye */}
          <Link to={`/edit/${post.id}`}><FaEdit /> Editar</Link> {/* Agrega FaEdit */}
          <button onClick={() => onDelete(post.id)}><FaTrash /> Eliminar</button> {/* Agrega FaTrash */}
        </div>
      </div>
    </div>
  );
}