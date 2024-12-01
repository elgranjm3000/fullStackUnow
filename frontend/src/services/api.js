import axios from 'axios';

const API_BASE_URL = 'http://localhost/proyectoPrueba/backend/public/index.php';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    if (!config.url.includes('/login')) {
      const token = localStorage.getItem('authToken');            
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getLogin = (data) => api.post('/login', data);
export const getEmpleados = () => api.get('/api/empleado');
export const getEmpleadoById = (id) => api.get(`/api/empleado/${id}`);
export const createEmpleado = (data) => api.post('/api/empleado', data);
export const updateEmpleado = (id, data) => api.put(`/api/empleado/${id}`, data);
export const deleteEmpleado = (id) => api.delete(`/api/empleado/${id}`);
export const positionEmpleado = () => api.get('/api/cargos');

export default api;
