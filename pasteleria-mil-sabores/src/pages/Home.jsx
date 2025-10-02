import { pasteles } from "../utils/mockPasteles"
import { PastelCard } from "../components/PastelCard"
import '../styles/theme.css';

export default function Home(){
    return(
        <>
            <section id="home" className='screen'>
                <h2 className="home-title">🎂 Pastelería Mil Sabores</h2>
                <p>Bienvenido a nuestra pastelería, donde cada bocado es una celebración de sabor y tradición.</p>
                <p>Explora nuestro catálogo de deliciosos pasteles y postres artesanales, hechos con amor y dedicación para ti.</p>
            </section>
            <form className='form-buscar' aria-label="Buscador de pasteles" data-screen="home">
                <label htmlFor="q">¿Que te gustaría comer este día?</label>
                <input id="q" name="q" type="search" placeholder="Buscar pasteles..." aria-label="Buscar pasteles"/>
                <button className="btn-search">Buscar</button>
            </form>
            <div className="row g-3">
                <h4>Destacados de hoy</h4>
                {
                    pasteles.slice(0, 3).map(p => (
                        <div className="col-12 col-md-6 col-xl-4" key={p.id}>
                        <PastelCard pastel={p} />
                        </div>
                    ))
                }
            </div>
        </>
    );
}