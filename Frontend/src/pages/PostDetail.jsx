import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { translateBatch } from "../services/translateService";
import { useLanguage } from "../context/LanguageContext";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [translated, setTranslated] = useState(null);

  const { lang } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data.data));
  }, [id]);

  useEffect(() => {
    const translate = async () => {
      if (!post) return;

      if (lang === "es") {
        setTranslated(post);
        return;
      }

      const result = await translateBatch(
        {
          post: {
            title: post.title,
            content: post.content
          }
        },
        lang
      );

      setTranslated({
        ...post,
        title: result.post?.title || post.title,
        content: result.post?.content || post.content
      });
    };

    translate();
  }, [lang, post]);

  if (!translated) {
    return <div className="loader"></div>;
  }

  return (
    <div className="post-hero">

      {/* HERO */}
      <div
        className="post-hero-bg"
        style={{
          backgroundImage: `url(${translated.image})`
        }}
      >
        <div className="post-hero-overlay" />
      </div>

      {/* CARD */}
      <div className="post-card">

        <button className="post-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <h1 className="post-title">{translated.title}</h1>

        <p className="post-meta">
          📰 Publicado • {new Date().toLocaleDateString()}
        </p>

        {/* IMAGEN CENTRADA */}
        {translated.image && (
          <img
            src={translated.image}
            className="post-image"
            alt="preview"
          />
        )}

        <p className="post-content">
          {translated.content}
        </p>

      </div>
    </div>
  );
}
