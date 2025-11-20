import api from './api';

export const contactService = {
  // Enviar mensaje de contacto
  sendMessage: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  }
};
