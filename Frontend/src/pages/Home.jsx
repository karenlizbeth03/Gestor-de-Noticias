import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { translateBatch } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";
import { FaEdit, FaTrash, FaPlus, FaSadTear } from "react-icons/fa";

export default function Home({ search }) {
  const [posts, setPosts] = useState([]);
  const [translatedPosts, setTranslatedPosts] = useState([]);

  // ✅ NUEVO (modal eliminar)
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const { lang, uiText } = useLanguage();
  const navigate = useNavigate();

  const fetchPosts = () => {
    fetch("https://gestor-de-noticias.onrender.com/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🌍 TRADUCCIÓN
  useEffect(() => {
    const translate = async () => {
      if (lang === "es") {
        setTranslatedPosts(posts);
        return;
      }

      try {
        const result = await translateBatch({
          posts: posts.map(p => ({
            title: p.title,
            content: p.content
          }))
        }, lang);

        const newPosts = posts.map((p, i) => ({
          ...p,
          title: result.posts?.[i]?.title || p.title,
          content: result.posts?.[i]?.content || p.content
        }));

        setTranslatedPosts(newPosts);
      } catch {
        setTranslatedPosts(posts);
      }
    };

    if (posts.length > 0) translate();
  }, [lang, posts]);

  // 🔥 FILTRO
  const filteredPosts = translatedPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ ABRIR MODAL
  const handleDelete = (id) => {
    setPostToDelete(id);
    setShowConfirm(true);
  };

  // ✅ CONFIRMAR ELIMINACIÓN
  const confirmDelete = async () => {
    try {
      await fetch(`https://gestor-de-noticias.onrender.com/api/posts/${postToDelete}`, {
        method: "DELETE"
      });

      setShowConfirm(false);
      setPostToDelete(null);

      // 🔥 refrescar lista
      fetchPosts();

    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  return (
    <div className="container">

      <h1>{uiText.title}</h1>
      <p>{uiText.subtitle}</p>

      {/* BOTÓN FLOTANTE */}
      <button
        className="fab"
        onClick={() => navigate("/create")}
      >
        <FaPlus />
      </button>

      <div className="grid">
        {filteredPosts.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No se encontraron resultados <FaSadTear />
          </p>
        ) : (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className="card"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {post.image && (
                <img src={post.image} className="card-img" />
              )}

              <div className="card-body">
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 80)}...</p>

                <div className="card-actions">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${post.id}`);
                    }}
                  >
                    <FaEdit /> Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ MODAL BONITO */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>⚠️ Confirmar eliminación</h3>
            </div>

            <div className="modal-body">
              <p>¿Seguro que quieres eliminar esta publicación?</p>
            </div>

            <div className="form-actions">
              <button className="btn btn-danger" onClick={confirmDelete}>
                Sí, eliminar
              </button>

              <button
                className="btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}