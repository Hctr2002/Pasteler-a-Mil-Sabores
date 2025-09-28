import React from 'react';
import './Catalogo.css';
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

      {/* --- CORRECCIÓN DE ESTRUCTURA AQUÍ --- */}
      {/* =======================================
          SECCIÓN DE FILTROS CORREGIDA
          ======================================= */}
      <aside className="filter-section screen">
        <form>
          {/* Cambiamos div por fieldset y h4 por legend */}
          <fieldset className="filter-group">
            <legend>Categorías</legend>
            <div className="filter-options">
              <div className="filter-option">
                <input type="checkbox" id="cat-chocolate" name="cat-chocolate" />
                <label htmlFor="cat-chocolate">Chocolate</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="cat-frutales" name="cat-frutales" />
                <label htmlFor="cat-frutales">Frutales</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="cat-tradicionales" name="cat-tradicionales" />
                <label htmlFor="cat-tradicionales">Tradicionales</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="cat-veganos" name="cat-veganos" />
                <label htmlFor="cat-veganos">Veganos</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="cat-hojaldre" name="cat-hojaldre" />
                <label htmlFor="cat-hojaldre">Hojaldre-rellenos</label>
              </div>
            </div>
          </fieldset>

          {/* Cambiamos div por fieldset y h4 por legend */}
          <fieldset className="filter-group">
            <legend>Tamaño</legend>
            <div className="filter-options">
              <div className="filter-option">
                <input type="radio" id="size-6-8" name="size" />
                <label htmlFor="size-6-8">De 6/8 personas</label>
              </div>
              <div className="filter-option">
                <input type="radio" id="size-10-12" name="size" />
                <label htmlFor="size-10-12">De 10/12 personas</label>
              </div>
              <div className="filter-option">
                <input type="radio" id="size-14-16" name="size" />
                <label htmlFor="size-14-16">De 14/16 personas</label>
              </div>
              <div className="filter-option">
                <input type="radio" id="size-18-20" name="size" />
                <label htmlFor="size-18-20">De 18/20 personas</label>
              </div>
            </div>
          </fieldset>

          {/* Cambiamos div por fieldset y h4 por legend */}
          <fieldset className="filter-group">
            <legend>Tipo</legend>
            <select name="type">
              <option value="" disabled selected>Seleccione una opción</option>
              <option value="redondo">Redondo</option>
              <option value="cuadrado">Cuadrado</option>
              <option value="especial">Forma Especial</option>
            </select>
          </fieldset>

          <button type="submit" className="btn">Aplicar Filtros</button>
        </form>
      </aside>
    </div>
  );
}

export default Catalogo;