// src/components/Contacto.jsx

import React from 'react';
import '../App.css'; 

function Contacto() {
  return (
    // Quitamos la clase de aquí para ponerla en el div de abajo
    <main> 
      {/* ↓↓ ESTE ES EL NUEVO CONTENEDOR QUE LO ENVUELVE TODO ↓↓ */}
      <div className="contact-container"> 
        
        <h2>Contáctanos</h2>
        <p>
          ¿Tienes dudas, pedidos especiales o sugerencias? ¡Escríbenos!
        </p>
        
        <ul>
          <li>📍 Dirección: Av. Dubara 1234, Santiago, Chile</li>
          <li>📞 Teléfono: +56 9 1234 5678</li>
          <li>✉️ Correo: <a href="mailto:contacto@milsabores.cl">contacto@milsabores.cl</a></li>
        </ul>

        {/* El formulario ahora está dentro del contenedor principal */}
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input type="email" id="correo" name="correo" required />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="6" required></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>

      </div> {/* ← Cerramos el nuevo contenedor */}
    </main>
  );
}

export default Contacto;