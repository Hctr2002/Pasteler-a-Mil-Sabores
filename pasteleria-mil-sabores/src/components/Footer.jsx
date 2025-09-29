// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORTAMOS Link
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="main-footer">

      {/* Contenido principal del footer */}
      <div className="footer-content">
        <p>© 2025 Pastelería Mil Sabores. Todos los derechos reservados.</p>
        <p>Diseñado por Héctor Robledo, Jose Luis Medina e Iván Del Pino</p>
      </div>

      {/* Colores de politicas y contacto */}
      <div className="footer-links">
        {/* 2. REEMPLAZAMOS <a> por <Link> y href por to */}
        <Link to="/politica-de-privacidad">Política de privacidad</Link>
        <Link to="/terminos-de-servicio">Términos de servicio</Link>
        <Link to="/contacto">Contacto</Link>
      </div>

      {/* Enlaces de redes sociales con los íconos de React */}
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      {/* Mensaje de cookies y botón */}
      <div className="cookie-notice">
        <p>
          Este sitio web utiliza cookies para mejorar la experiencia del usuario.
          Al continuar navegando, aceptas nuestra <Link to="/politica-de-privacidad">política de privacidad</Link>.
        </p>
      </div>
      
      <div className="footer-back-to-top">
        {/* Este enlace se queda como <a> porque no va a una ruta, sino a un ancla (#top) */}
        <a href="#top" className="back-to-top">Volver arriba</a>
      </div>
        
    </footer>
  );
}

export default Footer;