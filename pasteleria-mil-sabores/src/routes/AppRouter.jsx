import { Routes, Route } from "react-router-dom";
import PrincipalPage from '../pages/PrincipalPage.jsx';
import Catalogo from '../pages/Catalogo.jsx';
import PoliticaDePrivacidad from '../pages/PoliticaDePrivacidad.jsx';
import TerminosDeServicio from '../pages/TerminosDeServicio.jsx';
import PastelDetalle from "../pages/PastelDetalle.jsx";
import Contacto from '../pages/Contacto.jsx';
import Carrito from '../pages/carrito.jsx';
import Home from '../pages/Home.jsx'
import Blogs from "../pages/blogs.jsx";
import Loginpage from "../pages/Loginpage.jsx";
import Register from "../pages/register.jsx";
import Perfil from "../pages/perfil.jsx";

export default function AppRouter(){
    return(
        <Routes>
            <Route path="/" element={<PrincipalPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/politica-de-privacidad" element={<PoliticaDePrivacidad />} />
            <Route path="/terminos-de-servicio" element={<TerminosDeServicio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/pastel/:id" element={<PastelDetalle />} />
            <Route path="/carrito" element={<Carrito/>}/>
            <Route path="/Loginpage" element={<Loginpage/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
        </Routes>
    );
}