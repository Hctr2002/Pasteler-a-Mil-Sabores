import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home.jsx';
import Catalogo from '../pages/Catalogo.jsx';
import PoliticaDePrivacidad from '../pages/PoliticaDePrivacidad.jsx';
import TerminosDeServicio from '../pages/TerminosDeServicio.jsx';
import Contacto from '../pages/Contacto.jsx';

export default function AppRouter(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/politica-de-privacidad" element={<PoliticaDePrivacidad />} />
            <Route path="/terminos-de-servicio" element={<TerminosDeServicio />} />
            <Route path="/contacto" element={<Contacto />} /> 
        </Routes>
    );
}