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

  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setForm(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3001/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>Editar Post</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}