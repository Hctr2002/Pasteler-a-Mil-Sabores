
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './components/Home.jsx';
import Catalogo from './components/Catalogo.jsx';
import PoliticaDePrivacidad from './components/PoliticaDePrivacidad.jsx';
import TerminosDeServicio from './components/TerminosDeServicio.jsx';
import Contacto from './components/Contacto.jsx';
import './styles/theme.css';

function App() {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/politica-de-privacidad" element={<PoliticaDePrivacidad />} />
            <Route path="/terminos-de-servicio" element={<TerminosDeServicio />} />
            <Route path="/contacto" element={<Contacto />} /> 
          </Routes>
          <Footer />
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default App;