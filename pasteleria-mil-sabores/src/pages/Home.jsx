import { pasteles } from "../utils/mockPasteles";
import { PastelCard } from "../components/PastelCard";
import { useState } from "react";
import '../styles/theme.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [query, setQuery] = useState("");

  // Filtra los pasteles según la búsqueda
  const resultados = pasteles.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  // Muestra destacados si no hay búsqueda
  const mostrarPasteles = query.trim() ? resultados : pasteles.slice(0, 3);

  const handleSubmit = (e) => e.preventDefault(); // evitar recarga

  return (
    <>
      <section id="home" className='screen'>
        <h2 className="home-title">🎂 Pastelería Mil Sabores</h2>
        <p>Bienvenido a nuestra pastelería, donde cada bocado es una celebración de sabor y tradición.</p>
        <p>Explora nuestro catálogo de deliciosos pasteles y postres artesanales, hechos con amor y dedicación para ti.</p>
      </section>

      <form className='form-buscar' aria-label="Buscador de pasteles" onSubmit={handleSubmit}>
        <label htmlFor="q">¿Qué te gustaría comer este día?</label>
        <input
          id="q"
          name="q"
          type="search"
          placeholder="Buscar pasteles..."
          aria-label="Buscar pasteles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="row g-3 mt-4">
        <h4>
          {query.trim()
            ? `Resultados de búsqueda${resultados.length ? "" : " (sin coincidencias)"}` 
            : "Destacados de hoy"}
        </h4>

        {mostrarPasteles.length > 0 ? (
          mostrarPasteles.map(p => (
            <div className="col-12 col-md-6 col-xl-4" key={p.id}>
              <PastelCard pastel={p} />
            </div>
          ))
        ) : (
          <p>No se encontraron pasteles con ese nombre 😢</p>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
