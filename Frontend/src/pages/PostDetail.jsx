import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data.data));
  }, [id]);

  if (!post) return <p style={{ padding: "30px" }}>Cargando...</p>;

  return (
    <div className="detail-page">

      {/* 🔙 BOTÓN REGRESAR */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      {/* HERO IMAGE */}
      {post.image && (
        <div className="detail-hero">
          <img src={post.image} alt={post.title} />
          <div className="detail-overlay"></div>
        </div>
      )}

      {/* CONTENIDO */}
      <div className="detail-content">
        <h1>{post.title}</h1>

        {post.image && (
          <img
            src={post.image}
            className="detail-thumb"
            alt="preview"
          />
        )}

        <p className="detail-text">
          {post.content}
        </p>
      </div>
    </div>
  );
}