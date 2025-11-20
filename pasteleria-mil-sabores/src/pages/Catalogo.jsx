import { useState } from "react";
import { usePasteles } from "../contexts/PastelesContext";
import { PastelCard } from "../components/PastelCard";
import { Filter } from "../components/Filter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/theme.css";

export default function Catalogo() {
  const { pasteles } = usePasteles();

  const [filters, setFilters] = useState({
    category: [],
    type: "",
    size: []
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredPasteles = pasteles.filter((p) => {
    const matchCategory = filters.category.length > 0 ? filters.category.includes(p.category) : true;
    const matchType = filters.type ? p.type === filters.type : true;
    const matchSize = filters.size.length > 0 ? filters.size.includes(p.size) : true;
    return matchCategory && matchType && matchSize;
  });

  return (
    <>
      <div className="catalogo-theme screen">
        <h1 className="h3 mb-3">Catálogo de Pasteles</h1>
        <p>Explora nuestra selección de deliciosos pasteles y postres artesanales.</p>

        <div className="catalogo-layout">
          <Filter onFilterChange={handleFilterChange} />

          <div className="catalogo-items">
            <h4>Listado de pasteles</h4>

            {filteredPasteles.length > 0 ? (
              <div className="row g-3 mt-3">
                {filteredPasteles.map((p) => (
                  <div className="col-12 col-md-6 col-xl-4" key={p.id}>
                    <PastelCard pastel={p} />
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay pasteles que coincidan con los filtros seleccionados</p>
            )}
          </div>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={1400}
          hideProgressBar
          closeOnClick
          pauseOnHover={false}
          draggable={false}
        />
      </div>
    </>
  );
}