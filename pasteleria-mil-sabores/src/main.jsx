import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import App from './App.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Catalogo from './components/Catalogo.jsx';
import PoliticaDePrivacidad from './components/PoliticaDePrivacidad.jsx';
import TerminosDeServicio from './components/TerminosDeServicio.jsx';
import Contacto from './components/Contacto.jsx'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
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
);