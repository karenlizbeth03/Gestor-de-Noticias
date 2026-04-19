import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  // VALIDACIÓN
  const validate = () => {
    const newErrors = {};

    if (!form.title || form.title.length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }

    if (!form.content || form.content.length < 10) {
      newErrors.content = "El contenido debe tener al menos 10 caracteres";
    }

    if (form.image && !form.image.startsWith("http")) {
      newErrors.image = "URL inválida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

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

    // ❌ SI HAY ERROR DEL BACK
    if (!res.ok) {
      setErrors(data.errors || { general: data.message });
      return;
    }

    // ✅ TODO OK
    setShowModal(false);
    setEditId(null);
    setForm({ title: "", content: "", image: "" });
    setErrors({});
    fetchPosts();
    

  } catch (err) {
    setErrors({ general: "Error de conexión con el servidor" });
  }
};

  return (
    <div className="create-page">

      <div className="create-container">

        {/* HEADER */}
        <div className="create-header">
          <button onClick={() => navigate(-1)} className="back-link">
            ← Volver
          </button>

          <h1>✍️ Crear nueva historia</h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="create-form">

          {/* TITULO */}
          <input
            className={`input ${errors.title ? "input-error" : ""}`}
            placeholder="Título de la historia..."
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          {errors.title && <span className="error">{errors.title}</span>}

          {/* IMAGEN */}
          <input
            className={`input ${errors.image ? "input-error" : ""}`}
            placeholder="URL de imagen (opcional)"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />
          {errors.image && <span className="error">{errors.image}</span>}

          {/* PREVIEW */}
          {form.image && (
            <div className="image-preview">
              <img src={form.image} alt="preview" />
            </div>
          )}

          {/* CONTENIDO */}
          <textarea
            className={`textarea big ${errors.content ? "input-error" : ""}`}
            placeholder="Empieza a escribir tu historia..."
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />
          {errors.content && (
            <span className="error">{errors.content}</span>
          )}

          {/* ACTIONS */}
          <div className="form-actions">
            <button type="submit" className="btn-publish">
               Publicar
            </button>

            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}