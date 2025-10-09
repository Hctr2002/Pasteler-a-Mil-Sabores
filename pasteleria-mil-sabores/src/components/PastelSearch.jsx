// src/pages/PastelSearch.jsx
import { useSearchParams } from "react-router-dom";
import { pasteles } from "../utils/mockPasteles";
import { PastelCard } from "../components/PastelCard";
import '../styles/theme.css';

export default function PastelSearch() {
  const [params] = useSearchParams();
  const query = params.get("q")?.toLowerCase() || "";

  // Filtrar los pasteles según el texto de búsqueda
  const resultados = pasteles.filter(p =>
    p.nombre.toLowerCase().includes(query) ||
    p.descripcion.toLowerCase().includes(query)
  );

  return (
    <section className="screen">
      <h2>Resultados de búsqueda</h2>
      {query && <p>Mostrando resultados para: <strong>{query}</strong></p>}
      
      <div className="row g-3 mt-3">
        {resultados.length > 0 ? (
          resultados.map(p => (
            <div className="col-12 col-md-6 col-xl-4" key={p.id}>
              <PastelCard pastel={p} />
            </div>
          ))
        ) : (
          <p>No se encontraron pasteles con ese nombre 😢</p>
        )}
      </div>
    </section>
  );
}
