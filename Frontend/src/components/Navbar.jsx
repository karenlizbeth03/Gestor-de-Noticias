import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onSearch, totalPosts }) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { lang, changeLanguage, uiText } = useLanguage();
  

const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme} className="btn">
  {theme === "dark" ? "🌙 Oscuro" : "☀️ Claro"}
</button>

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch && onSearch(value);
  };

  return (
    <nav className="navbar">
      <h2>📰 NewsAdmin</h2>

      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Inicio
      </Link>

      <input
        placeholder={uiText.search || "Buscar..."}
        value={search}
        onChange={handleSearch}
      />

      <select value={lang} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="es">ES</option>
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>

      <span>{totalPosts} {uiText.posts}</span>

      <button onClick={() => window.dispatchEvent(new Event("openModal"))}>
        + {uiText.newPost}
      </button>
    </nav>
  );
}