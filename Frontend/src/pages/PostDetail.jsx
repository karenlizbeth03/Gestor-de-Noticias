import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { translateBatch } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [translated, setTranslated] = useState(null);

  const { lang } = useLanguage();
  const navigate = useNavigate();

  // 🔄 Obtener post
  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data.data));
  }, [id]);

  // 🌍 Traducción
  useEffect(() => {
    const translate = async () => {
      if (!post) return;

      // 🔹 Español = original
      if (lang === "es") {
        setTranslated(post);
        return;
      }

      const result = await translateBatch(
        {
          post: {
            title: post.title,
            content: post.content
          }
        },
        lang
      );

      setTranslated({
        ...post,
        title: result.post?.title || post.title,
        content: result.post?.content || post.content
      });
    };

    translate();
  }, [lang, post]);

  if (!translated) {
    return <p style={{ padding: "30px" }}>Cargando...</p>;
  }

  return (
    <div className="detail-page">

      {/* 🔙 BOTÓN REGRESAR */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      {/* 🖼️ HERO IMAGE (GRANDE) */}
      {translated.image && (
        <div className="detail-hero">
          <img src={translated.image} alt={translated.title} />
          <div className="detail-overlay"></div>
        </div>
      )}

      {/* 📄 CONTENIDO */}
      <div className="detail-content">
<button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>
        <h1>{translated.title}</h1>

        {/* 🖼️ THUMB (IMAGEN PEQUEÑA) */}
        {translated.image && (
          <img
            src={translated.image}
            className="detail-thumb"
            alt="preview"
          />
        )}

        <p className="detail-text">
          {translated.content}
        </p>

      </div>
    </div>
  );
}