import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // 🔄 Obtener posts
  const fetchPosts = () => {
    fetch("http://localhost:3001/api/posts")
      .then(res => res.json())
      .then(data => {
        const postsData = data.data || [];
        setPosts(postsData);
        setFilteredPosts(postsData);
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
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este post?");
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

      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
        Panel de Noticias
      </h1>

      <p style={{ color: "#94a3b8" }}>
        Administra tus publicaciones fácilmente
      </p>

      {/* BOTÓN FLOTANTE */}
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

      {/* GRID */}
      <div className="grid">
        {filteredPosts.length === 0 ? (
          <p>No hay publicaciones</p>
        ) : (
          filteredPosts.map(post => (
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
                    Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
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
            onChange={handleChange}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error">{errors.title}</span>}

          <textarea
            name="content"
            placeholder="Contenido"
            value={form.content}
            onChange={handleChange}
            className={errors.content ? "input-error" : ""}
          />
          {errors.content && <span className="error">{errors.content}</span>}

          <input
            name="image"
            placeholder="URL Imagen"
            value={form.image}
            onChange={handleChange}
            className={errors.image ? "input-error" : ""}
          />
          {errors.image && <span className="error">{errors.image}</span>}

          {form.image && (
            <img
              src={form.image}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginTop: "10px"
              }}
            />
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-primary">
              Guardar
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