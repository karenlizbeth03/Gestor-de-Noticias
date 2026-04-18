import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    navigate("/");
    window.location.reload(); // refresca lista
  };

  return (
    <div className="container">
      <h1>Crear Post</h1>

      <form onSubmit={handleSubmit} className="form">

        {/* TÍTULO */}
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <span className="error">{errors.title}</span>}

        {/* CONTENIDO */}
        <textarea
          placeholder="Contenido"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className={errors.content ? "input-error" : ""}
        />
        {errors.content && <span className="error">{errors.content}</span>}

        {/* IMAGEN */}
        <input
          placeholder="URL Imagen"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className={errors.image ? "input-error" : ""}
        />
        {errors.image && <span className="error">{errors.image}</span>}

        {/* PREVIEW */}
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

        {/* BOTONES */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>

          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => {
              setShowModal(false);
              setErrors({});
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}