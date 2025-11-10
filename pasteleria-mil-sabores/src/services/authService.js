import api from './api';

export const authService = {
  // Registrar usuario
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      // Solo guardar el token, el perfil se actualizará desde el componente
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      // Solo guardar el token, el perfil se actualizará desde el componente
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  // Obtener perfil
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data.data; // Retornar solo los datos del usuario
  },

  // Actualizar perfil
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    if (response.data.success) {
      // Actualizar localStorage con los nuevos datos
      const currentProfile = JSON.parse(localStorage.getItem('ds_profile') || '{}');
      localStorage.setItem('ds_profile', JSON.stringify({
        ...currentProfile,
        nombre: response.data.data.nombre,
        email: response.data.data.email,
        telefono: response.data.data.telefono || '',
        direccion: response.data.data.direccion || ''
      }));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ds_profile');
    localStorage.removeItem('ds_cart');
  }
};
