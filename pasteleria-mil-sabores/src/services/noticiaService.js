import api from './api';

export const noticiaService = {
  // Obtener todas las noticias
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.type) params.append('type', filters.type);
    if (filters.impact) params.append('impact', filters.impact);
    
    const queryString = params.toString();
    const response = await api.get(`/noticias${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  // Obtener noticia por ID
  getById: async (id) => {
    const response = await api.get(`/noticias/${id}`);
    return response.data;
  },

  // Crear noticia (admin)
  create: async (noticiaData) => {
    const response = await api.post('/noticias', noticiaData);
    return response.data;
  },

  // Actualizar noticia (admin)
  update: async (id, noticiaData) => {
    const response = await api.put(`/noticias/${id}`, noticiaData);
    return response.data;
  },

  // Eliminar noticia (admin)
  delete: async (id) => {
    const response = await api.delete(`/noticias/${id}`);
    return response.data;
  }
};
