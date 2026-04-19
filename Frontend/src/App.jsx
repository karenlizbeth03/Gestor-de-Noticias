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