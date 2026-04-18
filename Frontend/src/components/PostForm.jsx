import { useState } from "react";

export default function PostForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    image: initialData.image || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Título" onChange={handleChange} value={form.title} />
      <textarea name="content" placeholder="Contenido" onChange={handleChange} value={form.content} />
      <input name="image" placeholder="URL Imagen" onChange={handleChange} value={form.image} />
      <button type="submit">Guardar</button>
    </form>
  );
}