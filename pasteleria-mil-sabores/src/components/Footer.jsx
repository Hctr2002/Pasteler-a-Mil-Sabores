// src/components/Footer.jsx

import React from 'react';
import './Footer.css';
// Importamos los íconos que acabamos de instalar
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    // Contenedor principal para el pie de pagina
    <footer className="main-footer">

      {/* Contenido principal del footer */}
      <div className="footer-content">
        <p>© 2025 Pastelería Mil Sabores. Todos los derechos reservados.</p>
        <p>Diseñado por Héctor Robledo, Jose Luis Medina e Iván Del Pino</p>
      </div>

      {/* Colores de politicas y contacto */}
      <div className="footer-links">
        <a href="#">Política de privacidad</a>
        <a href="#">Términos de servicio</a>
        <a href="#">Contacto</a>
      </div>

      {/* Enlaces de redes sociales con los íconos de React */}
      <div className="social-links">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaInstagram /></a>
      </div>

      {/* Mensaje de cookies y botón */}
      <div className="cookie-notice">
        <p>
          Este sitio web utiliza cookies para mejorar la experiencia del usuario.
          Al continuar navegando, aceptas nuestra <a href="#">política de privacidad</a>.
        </p>

      </div>
          <div class="footer-back-to-top">
            <a href="#top" class="back-to-top">Volver arriba</a>
        </div>
        
    </footer>
  );
}

export default Footer;