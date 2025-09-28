
import React from 'react';
import './Catalogo.css'; // Su propio archivo de estilos
import milHojasImage from '../assets/images/pastel-mil-hojas.png';
import tresLechesImage from '../assets/images/pastel-tres-leches.png';
import chocolateImage from '../assets/images/pastel-chocolate.png';

function Catalogo() {
  return (
    <div className="catalogo-container">
      <div className="screen">
        <h2>Catálogo de Pasteles</h2>
        <p>Explora nuestra selección de deliciosos pasteles y postres artesanales.</p>
        
        <h3>Listado de Pasteles</h3>

    
        <article className="card">
          <h4>Pastel Mil hojas</h4>
           <img src={milHojasImage} alt="Pastel de mil hojas" />

          <p className="meta">
            Categoría: Hojaldre-rellenos • Tipo: Redondo • Tamaño: 6/8 Personas • Calorías: N/A • Opiniones: ★★★★★
          </p>
          <p>
            Postre francés hecho de hojaldre con capas de crema pastelera.
          </p>
          <p><strong>Precio base: $19.990</strong></p>
          <div className="card-actions">
            <button className="btn">Ver detalle</button>
            <button className="btn">Agregar al carrito</button>
          </div>
        </article>

        <article className="card">
          <h4>Pastel Tres Leches</h4>
          <img src={tresLechesImage} alt="Pastel de Tres Leches" />
          <p className="meta">
            Categoría: Tradicionales • Tipo: Cuadrado • Tamaño: 6/8 Personas • Extras: N/A • Opiniones: ★★★★★
          </p>
          <p>
            Postre tradicional latinoamericano. Consiste en un bizcocho bañado con tres tipos de lácteo: leche evaporada, media crema y leche condensada.
          </p>
          <p><strong>Precio base: $19.990</strong></p>
          <div className="card-actions">
            <button className="btn">Ver detalle</button>
            <button className="btn">Agregar al carrito</button>
          </div>
        </article>

         <article className="card">
          <h4>Pastel de Chocolate</h4>
          <img src={chocolateImage} alt="Pastel de Chocolate" />
          <p className="meta">
            Categoría: Chocolate • Tipo: Redondo • Tamaño: 6/8 Personas • Extras: N/A • Opiniones: ★★★★★
          </p>
          <p>
            Delicioso pastel de chocolate con relleno de chocolate y cobertura de ganache.
          </p>
          <p><strong>Precio base: $19.990</strong></p>
          <div className="card-actions">
            <button className="btn">Ver detalle</button>
            <button className="btn">Agregar al carrito</button>
          </div>
        </article>

      </div>
    </div>
  );
}

export default Catalogo;