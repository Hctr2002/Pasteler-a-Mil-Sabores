// /src/pages/FormularioPastel.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePasteles } from '../contexts/PastelesContext';
import '../styles/theme.css';

const FormularioPastel = () => {
  // 1. OBTENER HERRAMIENTAS NECESARIAS
  const { id } = useParams();
  const navigate = useNavigate();
  const { pasteles, updatePasteles } = usePasteles();

  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
  });

  useEffect(() => {
    if (id) {
      const pastelAEditar = pasteles.find((p) => p.id === id);
      if (pastelAEditar) {
        setFormData(pastelAEditar);
      }
    }
  }, [id, pasteles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      const pastelesActualizados = pasteles.map((p) =>
        p.id === id ? formData : p
      );
      updatePasteles(pastelesActualizados);
    } else {
      const nuevoPastel = {
        ...formData,
        id: `DS${Date.now()}`,
        opinions: 5,
      };
      const pastelesActualizados = [...pasteles, nuevoPastel];
      updatePasteles(pastelesActualizados);
    }

    navigate('/admin');
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Pastel' : 'Agregar Nuevo Pastel'}</h2>
      
      <form onSubmit={handleSubmit} className="pastel-form">
        <label>URL de la Foto</label>
        <input type="text" name="photo" value={formData.photo} onChange={handleChange} required />

        <label>Título</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Descripción</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Categoría</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>Tipo (Redondo, Cuadrado)</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        
        <label>Tamaño (ej: 6/8 Personas)</label>
        <input type="text" name="size" value={formData.size} onChange={handleChange} required />

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={() => navigate('/admin')}
          >
            Volver al Panel
          </button>
          <button type="submit" className="btn-submit">
            {id ? 'Guardar Cambios' : 'Crear Pastel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPastel;