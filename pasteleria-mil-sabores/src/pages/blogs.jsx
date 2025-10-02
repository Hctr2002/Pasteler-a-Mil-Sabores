import { Noticias } from "../utils/mockNoticias"; // **Asegúrate de que la ruta a tu archivo de datos sea correcta**
import { NoticiaCard } from "../components/NoticiaCard"; // Importa el componente que acabamos de crear
import '../styles/theme.css'; // Mantiene la importación de estilos

export default function Blogs(){
  return (
    <>
      <div className="blogs-theme">
        <h1 className="h3 mb-3">Blogs y Noticias</h1>
        <p>Descubre las últimas tendencias, análisis y novedades del mundo culinario global. Mantente al día con lo que se cuece.</p>
        
        <div className="row g-4"> {/* Usamos g-4 para un poco más de espaciado entre tarjetas */}
          <h4>Tendencias y Noticias Destacadas</h4>
          {
            // Mapeamos el array de noticiasCocina para renderizar cada NoticiaCard
            Noticias.map(n => (
              <div className="col-12 col-md-6 col-xl-4" key={n.id}>
                <NoticiaCard noticia={n}/>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}