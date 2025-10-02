import '../styles/theme.css';

function Contacto() {
  return (
    <main> 
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
      </div>
    </main>
  );
}

export default Contacto;