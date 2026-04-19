import { FaSpinner } from "react-icons/fa"; // Importa icono

export default function Loader() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <FaSpinner className="fa-spin" /> Cargando... {/* Agrega FaSpinner con animación */}
    </div>
  );
}