import api from './api';

export const pastelService = {
  // Obtener todos los pasteles
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.type) params.append('type', filters.type);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const response = await api.get(`/pasteles${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  // Obtener un pastel por ID
  getById: async (id) => {
    const response = await api.get(`/pasteles/${id}`);
    return response.data;
  },

  // Crear pastel (admin)
  create: async (pastelData) => {
    const response = await api.post('/pasteles', pastelData);
    return response.data;
  },

  // Actualizar pastel (admin)
  update: async (id, pastelData) => {
    const response = await api.put(`/pasteles/${id}`, pastelData);
    return response.data;
  },

  // Eliminar pastel (admin)
  delete: async (id) => {
    const response = await api.delete(`/pasteles/${id}`);
    return response.data;
  }
};
