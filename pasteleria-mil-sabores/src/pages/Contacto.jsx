import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactService } from '../services/contactService';
import '../styles/theme.css';

function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contactService.sendMessage(formData);

      if (response.success) {
        toast.success('¡Gracias! Nos contactaremos contigo lo antes posible.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(response.message || 'Hubo un error al enviar el mensaje.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      const errorMessage = error.response?.data?.message || 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} disabled={isSubmitting} required></textarea>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </main>
  );
}

export default Contacto;