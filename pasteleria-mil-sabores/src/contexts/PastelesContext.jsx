import React, { createContext, useContext, useState, useEffect } from 'react';
import { pastelService } from '../services/pastelService';
import { toast } from 'react-toastify';

const PastelesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePasteles = () => useContext(PastelesContext);

export const PastelesProvider = ({ children }) => {
  const [pasteles, setPasteles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar pasteles desde la API
  useEffect(() => {
    loadPasteles();
  }, []);

  const loadPasteles = async () => {
    try {
      setLoading(true);
      const response = await pastelService.getAll();
      setPasteles(response.data);
    } catch (error) {
      console.error('Error al cargar pasteles:', error);
      toast.error('Error al cargar los pasteles');
    } finally {
      setLoading(false);
    }
  };

  const updatePasteles = async (pastelData, id = null) => {
    try {
      if (id) {
        // Actualizar
        await pastelService.update(id, pastelData);
        toast.success('Pastel actualizado exitosamente');
      } else {
        // Crear
        await pastelService.create(pastelData);
        toast.success('Pastel creado exitosamente');
      }
      await loadPasteles();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Error al guardar el pastel');
      throw error;
    }
  };

  const deletePastel = async (id) => {
    try {
      await pastelService.delete(id);
      toast.success('Pastel eliminado exitosamente');
      await loadPasteles();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Error al eliminar el pastel');
      throw error;
    }
  };

  const value = { pasteles, updatePasteles, deletePastel, loading, loadPasteles };

  return (
    <PastelesContext.Provider value={value}>
      {children}
    </PastelesContext.Provider>
  );
};