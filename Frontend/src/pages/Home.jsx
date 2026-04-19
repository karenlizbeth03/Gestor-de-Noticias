import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { translateBatch } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [ setUiText] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [selectedLang, setSelectedLang] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const { lang, uiText } = useLanguage();

  const navigate = useNavigate();

  // 🧠 TEXTOS BASE
  const defaultUI = {
    title: "Panel de Noticias",
    subtitle: "Administra tus publicaciones fácilmente",
    noPosts: "No hay publicaciones",
    edit: "Editar",
    delete: "Eliminar",
    save: "Guardar",
    cancel: "Cancelar",
    create: "Crear Post",
    update: "Editar Post",
    selectLang: "Seleccionar Idioma",
    translating: "Traduciendo...",
    confirmDelete: "¿Seguro que deseas eliminar este post?",
    titlePlaceholder: "Título",
    contentPlaceholder: "Contenido",
    imagePlaceholder: "URL Imagen"
  };

  // 🔄 Obtener posts
  const fetchPosts = () => {
    fetch("http://localhost:3001/api/posts")
      .then(res => res.json())
      .then(data => {
        const postsData = data.data || [];
        setPosts(postsData);
        setFilteredPosts(postsData);
        setTranslatedPosts(postsData);
      });
  };

  useEffect(() => {
    fetchPosts();

    const open = () => setShowModal(true);
    window.addEventListener("openModal", open);

    return () => window.removeEventListener("openModal", open);
  }, []);

  // 🔍 BUSCADOR
  const handleSearch = (term) => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.content.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // 🌍 TRADUCCIÓN GLOBAL PRO
  const translateAll = async (lang, postsData) => {
    if (lang === "es") {
      setTranslatedPosts(postsData);
      setUiText(defaultUI);
      return;
    }

    setIsTranslating(true);

    const payload = {
      ui: defaultUI,
      posts: postsData.map(p => ({
        id: p.id,
        title: p.title,
        content: p.content
      }))
    };

    try {
      const result = await translateBatch(payload, lang);

      setUiText(result.ui || defaultUI);

      const newPosts = postsData.map((post, i) => ({
        ...post,
        title: result.posts?.[i]?.title || post.title,
        content: result.posts?.[i]?.content || post.content
      }));

      setTranslatedPosts(newPosts);

    } catch (err) {
      console.error(err);
      setTranslatedPosts(postsData);
      setUiText(defaultUI);
    } finally {
      setIsTranslating(false);
    }
  };

  // 🔁 Ejecutar traducción automática
  useEffect(() => {
    if (filteredPosts.length > 0) {
      translateAll(selectedLang, filteredPosts);
    }
  }, [selectedLang, filteredPosts]);

  // 🌐 Cargar idioma guardado
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setSelectedLang(saved);
  }, []);

  // 🌐 Cambiar idioma
  const handleLangChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    localStorage.setItem("lang", lang);
  };

  // ➕ CREAR / EDITAR
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const url = editId
      ? `http://localhost:3001/api/posts/${editId}`
      : "http://localhost:3001/api/posts";

    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || {});
        return;
      }

      setShowModal(false);
      setEditId(null);
      setForm({ title: "", content: "", image: "" });
      fetchPosts();

    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ EDITAR
  const handleEdit = (post) => {
    setForm(post);
    setEditId(post.id);
    setShowModal(true);
  };

  // 🗑️ ELIMINAR
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      uiText.confirmDelete || defaultUI.confirmDelete
    );
    if (!confirmDelete) return;

    await fetch(`http://localhost:3001/api/posts/${id}`, {
      method: "DELETE",
    });

    fetchPosts();
  };

  // VALIDACIONES
  const validateField = (name, value) => {
    let error = "";

    if (name === "title") {
      if (!value) error = "El título es obligatorio";
      else if (value.length < 3)
        error = "El título debe tener al menos 3 caracteres";
    }

    if (name === "content") {
      if (!value) error = "El contenido es obligatorio";
      else if (value.length < 10)
        error = "El contenido debe tener al menos 10 caracteres";
    }

    if (name === "image") {
      if (value && !value.startsWith("http"))
        error = "La URL de la imagen no es válida";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    const error = validateField(name, value);

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <div className="container">

      <Navbar onSearch={handleSearch} totalPosts={posts.length} />

      <h1>{uiText.title || defaultUI.title}</h1>
      <p>{uiText.subtitle || defaultUI.subtitle}</p>

      {/* 🌐 IDIOMA */}
      <div style={{ marginBottom: "20px" }}>
        <label>{uiText.selectLang || defaultUI.selectLang}: </label>

        <select value={selectedLang} onChange={handleLangChange}>
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>

        {isTranslating && (
          <span style={{ marginLeft: "10px" }}>
            {uiText.translating || defaultUI.translating}
          </span>
        )}
      </div>

      {/* ➕ BOTÓN */}
      <button
        className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px"
        }}
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {/* 📦 POSTS */}
      <div className="grid">
        {translatedPosts.length === 0 ? (
          <p>{uiText.noPosts || defaultUI.noPosts}</p>
        ) : (
          translatedPosts.map(post => (
            <div
              key={post.id}
              className="card"
              onClick={() => navigate(`/post/${post.id}`)}
              style={{ cursor: "pointer" }}
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
                    {uiText.edit || defaultUI.edit}
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    {uiText.delete || defaultUI.delete}
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
        title={editId 
          ? (uiText.update || defaultUI.update)
          : (uiText.create || defaultUI.create)
        }
      >
        <form onSubmit={handleSubmit} className="form">

          <input
            name="title"
            placeholder={uiText.titlePlaceholder || defaultUI.titlePlaceholder}
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder={uiText.contentPlaceholder || defaultUI.contentPlaceholder}
            value={form.content}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder={uiText.imagePlaceholder || defaultUI.imagePlaceholder}
            value={form.image}
            onChange={handleChange}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-primary">
              {uiText.save || defaultUI.save}
            </button>

            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setShowModal(false)}
            >
              {uiText.cancel || defaultUI.cancel}
            </button>
          </div>

        </form>
      </Modal>
    </div>
  );
}