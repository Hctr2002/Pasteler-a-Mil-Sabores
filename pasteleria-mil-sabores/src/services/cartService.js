import api from './api';

export const cartService = {
  // Obtener carrito del usuario
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data.data;
  },

  // Actualizar carrito completo
  updateCart: async (cart) => {
    const response = await api.put('/cart', { cart });
    return response.data;
  },

  // Agregar item al carrito
  addToCart: async (item) => {
    const response = await api.post('/cart/add', item);
    return response.data;
  },

  // Limpiar carrito
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  }
};
