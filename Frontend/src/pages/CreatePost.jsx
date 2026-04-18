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
  };

  return (
    <div>
      <h1>Crear Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Contenido"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          placeholder="Imagen URL"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}