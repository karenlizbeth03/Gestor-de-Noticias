import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/postService";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.image} width="400" />
      <p>{post.content}</p>
    </div>
  );
}