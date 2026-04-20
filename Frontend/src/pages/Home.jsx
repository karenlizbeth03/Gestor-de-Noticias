import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { translateBatch } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";
import { FaEdit, FaTrash, FaPlus, FaSadTear } from "react-icons/fa";

export default function Home({ search }) {
  const [posts, setPosts] = useState([]);
  const [translatedPosts, setTranslatedPosts] = useState([]);
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

  const filteredPosts = translatedPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setPostToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`https://gestor-de-noticias.onrender.com/api/posts/${postToDelete}`, {
        method: "DELETE"
      });

      setShowConfirm(false);
      setPostToDelete(null);
      fetchPosts();
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  return (
    <div className="container">
      <h1>{uiText.homeTitle || "Gestor de Noticias"}</h1>
      <p>{uiText.homeSubtitle || "Administra tus publicaciones desde un solo lugar"}</p>

      <button
        className="fab"
        onClick={() => navigate("/create")}
      >
        <FaPlus />
      </button>

      <div className="grid">
        {filteredPosts.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            {uiText.noResults || "No se encontraron resultados"} <FaSadTear />
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
                    <FaEdit /> {uiText.edit || "Editar"}
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    <FaTrash /> {uiText.delete || "Eliminar"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{uiText.confirmDeleteTitle || "⚠️ Confirmar eliminación"}</h3>
            </div>

            <div className="modal-body">
              <p>{uiText.confirmDeleteMessage || "¿Seguro que quieres eliminar esta publicación?"}</p>
            </div>

            <div className="form-actions">
              <button className="btn btn-danger" onClick={confirmDelete}>
                {uiText.confirmDeleteYes || "Sí, eliminar"}
              </button>

              <button
                className="btn"
                onClick={() => setShowConfirm(false)}
              >
                {uiText.cancel || "Cancelar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}