import { pasteles } from "../utils/mockPasteles"
import { PastelCard } from "../components/PastelCard"

export default function Catalogo(){
  return (
    <>
      <div className="catalogo-theme">
        <h1 className="h3 mb-3">Catálogo de Pasteles</h1>
        <p>Explora nuestra selección de deliciosos pasteles y postres artesanales.</p>
        <div className="row g-3">
          <h4>Listado de pasteles</h4>
          {
            pasteles.map(p => (
              <div className="col-12 col-md-6 col-xl-4" key={p.id}>
                <PastelCard pastel={p}/>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}