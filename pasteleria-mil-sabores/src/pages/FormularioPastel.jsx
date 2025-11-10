// /src/pages/FormularioPastel.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePasteles } from '../contexts/PastelesContext';
import { toast } from 'react-toastify';
import '../styles/theme.css';

const FormularioPastel = () => {
  // 1. OBTENER HERRAMIENTAS NECESARIAS
  const { id } = useParams();
  const navigate = useNavigate();
  const { pasteles, updatePasteles, loading } = usePasteles();

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
        setFormData({
          photo: pastelAEditar.photo || '',
          title: pastelAEditar.title || '',
          description: pastelAEditar.description || '',
          category: pastelAEditar.category || '',
          type: pastelAEditar.type || '',
          size: pastelAEditar.size || '',
        });
      }
    }
  }, [id, pasteles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llamar a updatePasteles con los datos y el ID (si existe)
      await updatePasteles(formData, id || null);
      navigate('/admin');
    } catch (error) {
      console.error('Error al guardar pastel:', error);
      toast.error('Error al guardar el pastel');
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Pastel' : 'Agregar Nuevo Pastel'}</h2>
      
      <form onSubmit={handleSubmit} className="pastel-form">
        <label>URL de la Foto</label>
        <input 
          type="text" 
          name="photo" 
          value={formData.photo} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />

        <label>Título</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />

        <label>Descripción</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />

        <label>Categoría</label>
        <input 
          type="text" 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />

        <label>Tipo (Redondo, Cuadrado)</label>
        <input 
          type="text" 
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        
        <label>Tamaño (ej: 6/8 Personas)</label>
        <input 
          type="text" 
          name="size" 
          value={formData.size} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={() => navigate('/admin')}
            disabled={loading}
          >
            Volver al Panel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Guardando...' : (id ? 'Guardar Cambios' : 'Crear Pastel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPastel;