// Este es el componente principal App que envuelve la aplicación con contextos y router.
// Proporciona contextos de idioma y tema a toda la app.

import AppRouter from "./routes/AppRouter";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;