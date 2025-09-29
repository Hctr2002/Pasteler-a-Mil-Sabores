
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css'; // Crearemos este archivo para los estilos

const Header = () => {
  return (
    //  En JSX, 'class' se escribe como 'className'
    <header className="banner">
      <div className="brand">
        <a href="/">
          <h1>🎂 Mil Sabores</h1>
        </a>
        <p className="tagline">Tu Pastelería favorita donde tenemos justo lo que deseas</p>
      </div>

      <nav aria-label="Navegación principal">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/blogs">Blogs y noticias</a></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><a href="/carrito">Carrito</a></li>
          <li><a href="/login" id="login-link">Ingresar</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;