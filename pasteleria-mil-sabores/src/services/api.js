import axios from 'axios';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'https://backend-pasteleria.vercel.app/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('token');
      localStorage.removeItem('ds_profile');
      // Redirigir solo si no estamos ya en login
      if (window.location.pathname !== '/Loginpage') {
        window.location.href = '/Loginpage';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
