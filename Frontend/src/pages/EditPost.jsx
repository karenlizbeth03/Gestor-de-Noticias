import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { getPost, updatePost } from "../services/postService";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id).then(res => setPost(res.data));
  }, [id]);

  const handleSubmit = async (data) => {
    await updatePost(id, data);
    navigate("/");
  };

  if (!post) return <p>Cargando...</p>;

  return <PostForm onSubmit={handleSubmit} initialData={post} />;
}