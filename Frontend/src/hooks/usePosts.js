import { useEffect, useState } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("API:", data);

        setPosts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Ocurrió un error");
        setLoading(false);
      });
  }, []);

  return { posts, loading, error };
};