
// Este contexto maneja el estado del idioma para la aplicación.
// Proporciona el idioma actual, texto de UI y una función para cambiar el idioma.

import { createContext, useContext, useEffect, useState } from "react";
import { translateBatch } from "../services/translateService";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("es");
  const [uiText, setUiText] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
// Texto de UI por defecto en español
  const defaultUI = {
    title: "Publicaciones",
    noPosts: "No hay publicaciones",
    edit: "Editar",
    delete: "Eliminar",
    save: "Guardar",
    cancel: "Cancelar",
    create: "Crear Post",
    update: "Editar Post",
    selectLang: "Idioma",
    translating: "Traduciendo...",
    confirmDelete: "¿Seguro que deseas eliminar este post?",
    titlePlaceholder: "Título",
    contentPlaceholder: "Contenido",
    imagePlaceholder: "URL Imagen",
    back: "Volver",
    search: "Buscar noticias...",
    newPost: "Nuevo",
    posts: "posts"
  };

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLang(saved);
    else setUiText(defaultUI);
  }, []);

  const changeLanguage = async (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);

    if (newLang === "es") {
      setUiText(defaultUI);
      return;
    }

    setIsTranslating(true);

    try {
      const result = await translateBatch({ ui: defaultUI }, newLang);
      setUiText(result.ui || defaultUI);
    } catch {
      setUiText(defaultUI);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ lang, uiText, changeLanguage, isTranslating }}
    >
      {children}
    </LanguageContext.Provider>
  );
};