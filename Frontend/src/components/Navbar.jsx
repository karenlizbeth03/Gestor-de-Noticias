import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import {
  FaSearch,
  FaFileAlt,
  FaMoon,
  FaSun,
  FaPlus,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Navbar({ onSearch, totalPosts }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { lang, changeLanguage, uiText } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch && onSearch(value);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-top">
        <h2 className="logo">{uiText.navbarTitle || "Gestor de Noticias"}</h2>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`nav-content ${menuOpen ? "open" : ""}`}>
        <div className="nav-left">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            {uiText.publications || "PUBLICACIONES"}
          </Link>
        </div>

        <div className="nav-center">
          <div className="search-box">
            <FaSearch />
            <input
              placeholder={uiText.searchPlaceholder || "Buscar noticias..."}
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="nav-right">
          <div className="badge">
            <FaFileAlt /> {totalPosts}
          </div>

          <select
            className="select"
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          <button onClick={toggleTheme} className="theme-btn">
            {theme === "dark" ? <FaMoon /> : <FaSun />}
          </button>

          <button
            className="btn-new"
            onClick={() => navigate("/create")}
          >
            <FaPlus /> {uiText.newPost || "Nuevo"}
          </button>
        </div>
      </div>
    </nav>
  );
}