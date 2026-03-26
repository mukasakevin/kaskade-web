import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Vous pouvez ajouter ici une logique pour gérer 401 (non autorisé) etc.
    return Promise.reject(error);
  }
);

export default api;
