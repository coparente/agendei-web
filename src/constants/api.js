import axios from "axios";


const api = axios.create({
    // baseURL: "https://api-node-xa3e.onrender.com"
    baseURL: "http://localhost:3001"
});

// interceptor para incluir o token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('sessionToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // interceptor de resposta
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.clear();
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
  

export default api;