import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  // 🔍 VALIDAR URL IMAGEN
  const isValidImageUrl = (url) => {
    return (
      !url ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    );
  };

  // 📥 CARGAR POST
  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setForm(data.data || {}));
  }, [id]);

  // ✅ VALIDACIÓN
  const validate = () => {
    let newErrors = {};

    if (!form.title || form.title.length < 3) {
      newErrors.title = "Mínimo 3 caracteres";
    }

    if (!form.content || form.content.length < 10) {
      newErrors.content = "Mínimo 10 caracteres";
    }

    if (!isValidImageUrl(form.image)) {
      newErrors.image = "URL de imagen inválida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💾 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      navigate("/");

    } catch {
      setErrors({ general: "Error de conexión" });
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

          <h1>✏️ Editar historia</h1>
          <p>Modifica tu contenido</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="create-form">

          {/* ERROR GENERAL */}
          {errors.general && (
            <div className="alert error">{errors.general}</div>
          )}

          {/* TITULO */}
          <input
            className={`input ${errors.title ? "input-error" : ""}`}
            placeholder="Título"
            value={form.title}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, title: value });

              if (value.length < 3) {
                setErrors(prev => ({ ...prev, title: "Mínimo 3 caracteres" }));
              } else {
                setErrors(prev => ({ ...prev, title: null }));
              }
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}

          {/* IMAGEN */}
          <input
            className={`input ${errors.image ? "input-error" : ""}`}
            placeholder="URL de imagen"
            value={form.image}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, image: value });

              if (!isValidImageUrl(value)) {
                setErrors(prev => ({ ...prev, image: "URL inválida" }));
              } else {
                setErrors(prev => ({ ...prev, image: null }));
              }
            }}
          />
          {errors.image && <span className="error">{errors.image}</span>}

          {/* 🔥 PREVIEW IMAGEN */}
          {form.image && isValidImageUrl(form.image) && (
            <div className="image-preview">
              <img src={form.image} alt="preview" />
            </div>
          )}

          {/* CONTENIDO */}
          <textarea
            className={`textarea big ${errors.content ? "input-error" : ""}`}
            placeholder="Contenido"
            value={form.content}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, content: value });

              if (value.length < 10) {
                setErrors(prev => ({ ...prev, content: "Mínimo 10 caracteres" }));
              } else {
                setErrors(prev => ({ ...prev, content: null }));
              }
            }}
          />
          {errors.content && <span className="error">{errors.content}</span>}

          {/* BOTONES */}
          <div className="form-actions">
            <button type="submit" className="btn-publish">
              💾 Actualizar
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