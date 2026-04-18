import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
      });
  }, []);

  return (
    <div>
      {/* Botón */}
      <Link to="/create">
        <button style={{ marginBottom: "20px" }}>Crear Post</button>
      </Link>

      <h1>Noticias</h1>

      {posts.length === 0 ? (
        <p>No hay publicaciones</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}