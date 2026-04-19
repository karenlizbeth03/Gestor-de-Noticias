import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onSearch, totalPosts }) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { lang, changeLanguage, uiText } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch && onSearch(value);
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <h2 className="logo">📰 NewsAdmin</h2>

        <Link
          to="/"
          className={`nav-link ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          Inicio
        </Link>
      </div>

      {/* CENTER (SEARCH PRO) */}
      <div className="nav-center">
        <div className="search-box">
          <span>🔍</span>
          <input
            placeholder={uiText.search || "Buscar noticias..."}
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* CONTADOR */}
        <div className="badge">
          📄 {totalPosts}
        </div>

        {/* IDIOMA */}
        <select
          className="select"
          value={lang}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>

        {/* TEMA */}
        <button onClick={toggleTheme} className="theme-btn">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {/* BOTÓN NUEVO */}
        <button
          className="btn-new"
          onClick={() => window.dispatchEvent(new Event("openModal"))}
        >
          ✨ {uiText.newPost || "Nuevo"}
        </button>

      </div>
    </nav>
  );
}