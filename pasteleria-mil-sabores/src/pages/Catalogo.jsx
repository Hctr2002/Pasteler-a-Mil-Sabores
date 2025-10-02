import { pasteles } from "../utils/mockPasteles"
import { PastelCard } from "../components/PastelCard"

export default function Catalogo(){
  return (
    <>
      <h1 className="h3 mb-3">Catálogo</h1>
      <div className="row g-3">
        {
          pasteles.map(p => (
            <div className="col-12 col-md-6 col-xl-4" key={p.id}>
              <PastelCard pastel={p}/>
            </div>
          ))
        }
      </div>
    </>
  );
}