import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { translateBatch } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";
import { FaEdit, FaTrash, FaPlus, FaSadTear } from "react-icons/fa"; // Importa los iconos necesarios

export default function Home({ search }) {
  const [posts, setPosts] = useState([]);
  const [translatedPosts, setTranslatedPosts] = useState([]);

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

  // 🔥 FILTRO EN TIEMPO REAL
  const filteredPosts = translatedPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>{uiText.title}</h1>
      <p>{uiText.subtitle}</p>

      <button
        className="fab"
        onClick={() => navigate("/create")}
      >
        <FaPlus /> {/* Reemplaza "+" con FaPlus */}
      </button>

      <div className="grid">
        {filteredPosts.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No se encontraron resultados <FaSadTear /> {/* Reemplaza 😢 con FaSadTear */}
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
                    <FaEdit /> Editar {/* Reemplaza ✏️ con FaEdit */}
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    <FaTrash /> Eliminar {/* Reemplaza 🗑️ con FaTrash */}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}