import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaRocket } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function CreatePost() {
  const navigate = useNavigate();
  const { uiText } = useLanguage();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const isValidImageUrl = (url) => {
    return (
      !url ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    );
  };

  const validate = () => {
    let newErrors = {};

    if (!form.title || form.title.length < 3) {
      newErrors.title = uiText.minTitleError || "Mínimo 3 caracteres";
    }

    if (!form.content || form.content.length < 10) {
      newErrors.content = uiText.minContentError || "Mínimo 10 caracteres";
    }

    if (!isValidImageUrl(form.image)) {
      newErrors.image = uiText.invalidImageError || "URL inválida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch("https://gestor-de-noticias.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      navigate("/");
    } catch {
      setErrors({ general: uiText.connectionError || "Error de conexión con el servidor" });
    }
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <div className="create-header">
          <button onClick={() => navigate(-1)} className="back-link">
            {uiText.back || "← Volver"}
          </button>

          <h1><FaPen /> {uiText.createHeader || "Crear nueva historia"}</h1>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          {errors.general && (
            <div className="alert error">{errors.general}</div>
          )}

          <input
            className={`input ${errors.title ? "input-error" : ""}`}
            placeholder={uiText.titlePlaceholder || "Título..."}
            value={form.title}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, title: value });

              if (value.length < 3) {
                setErrors(prev => ({ ...prev, title: uiText.minTitleError || "Mínimo 3 caracteres" }));
              } else {
                setErrors(prev => ({ ...prev, title: null }));
              }
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}

          <input
            className={`input ${errors.image ? "input-error" : ""}`}
            placeholder={uiText.imagePlaceholder || "URL imagen"}
            value={form.image}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, image: value });

              if (!isValidImageUrl(value)) {
                setErrors(prev => ({ ...prev, image: uiText.invalidImageError || "URL inválida" }));
              } else {
                setErrors(prev => ({ ...prev, image: null }));
              }
            }}
          />
          {errors.image && <span className="error">{errors.image}</span>}

          {form.image && isValidImageUrl(form.image) && (
            <div className="image-preview">
              <img src={form.image} alt={uiText.previewImageAlt || "preview"} />
            </div>
          )}

          <textarea
            className={`textarea big ${errors.content ? "input-error" : ""}`}
            placeholder={uiText.contentPlaceholder || "Contenido..."}
            value={form.content}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, content: value });

              if (value.length < 10) {
                setErrors(prev => ({ ...prev, content: uiText.minContentError || "Mínimo 10 caracteres" }));
              } else {
                setErrors(prev => ({ ...prev, content: null }));
              }
            }}
          />
          {errors.content && <span className="error">{errors.content}</span>}

          <div className="form-actions">
            <button type="submit" className="btn-publish">
              <FaRocket /> {uiText.publishButton || "Publicar"}
            </button>

            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(-1)}
            >
              {uiText.cancel || "Cancelar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}