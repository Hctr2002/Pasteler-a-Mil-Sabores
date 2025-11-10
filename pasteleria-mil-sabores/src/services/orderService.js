import api from './api';

export const orderService = {
  // Crear pedido
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Obtener mis pedidos
  getMine: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Obtener pedido por ID
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Obtener todos los pedidos (admin)
  getAll: async () => {
    const response = await api.get('/orders/admin/all');
    return response.data;
  },

  // Actualizar estado (admin)
  updateStatus: async (id, estado) => {
    const response = await api.put(`/orders/${id}/status`, { estado });
    return response.data;
  }
};
