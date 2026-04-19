import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { translateBatch } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({}); // ✅ FALTABA ESTO

  const { lang, uiText } = useLanguage();
  const navigate = useNavigate();

  // 🔄 GET POSTS
  const fetchPosts = () => {
    fetch("http://localhost:3001/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
      });
  };

  useEffect(() => {
    fetchPosts();

    const open = () => setShowModal(true);
    window.addEventListener("openModal", open);

    return () => window.removeEventListener("openModal", open);
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

  // ✏️ EDITAR
  const handleEdit = (post) => {
    setForm(post);
    setEditId(post.id);
    setShowModal(true);
  };

  // 🗑️ ELIMINAR
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este post?")) return;

    await fetch(`http://localhost:3001/api/posts/${id}`, {
      method: "DELETE"
    });

    fetchPosts();
  };

  // VALIDACIONES
  const validate = () => {
    let newErrors = {};

    if (!form.title) newErrors.title = "Título requerido";
    if (!form.content) newErrors.content = "Contenido requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💾 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const url = editId
      ? `http://localhost:3001/api/posts/${editId}`
      : "http://localhost:3001/api/posts";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setEditId(null);
    setForm({ title: "", content: "", image: "" });
    fetchPosts();
  };

  return (
    <div className="container">

      <h1>{uiText.title}</h1>
      <p>{uiText.subtitle}</p>

      {/* ➕ BOTÓN FLOAT */}
      <button
        className="fab"
        onClick={() => {
          setEditId(null);
          setForm({ title: "", content: "", image: "" });
          setShowModal(true);
        }}
      >
        +
      </button>

      {/* 📦 POSTS */}
      <div className="grid">
        {translatedPosts.length === 0 ? (
          <div className="loader"></div> // 🔥 LOADING PRO
        ) : (
          translatedPosts.map(post => (
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
                      handleEdit(post);
                    }}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🧾 MODAL */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditId(null);
        }}
        title={editId ? "Editar Post" : "Crear Post"}
      >
        <form onSubmit={handleSubmit} className="form">

          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          {errors.title && <span className="error">{errors.title}</span>}

          <textarea
            name="content"
            placeholder="Contenido"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />
          {errors.content && <span className="error">{errors.content}</span>}

          <input
            name="image"
            placeholder="URL Imagen"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-primary">
              💾 Guardar
            </button>

            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>

        </form>
      </Modal>
    </div>
  );
}