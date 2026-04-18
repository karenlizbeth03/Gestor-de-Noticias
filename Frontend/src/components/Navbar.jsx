import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onSearch, totalPosts }) {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-left">
        <h2 className="logo">📰 NewsAdmin</h2>
      </div>

      {/* LINKS */}
      <div className="navbar-center">
        <Link
          to="/"
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Inicio
        </Link>
      </div>

      {/* BUSCADOR */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* ACCIONES */}
      <div className="navbar-right">
        <span className="post-count">
          {totalPosts} posts
        </span>

        <button
          className="btn btn-primary nav-btn"
          onClick={() => window.dispatchEvent(new Event("openModal"))}
        >
          + Nuevo
        </button>
      </div>
    </nav>
  );
}