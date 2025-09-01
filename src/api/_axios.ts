// src/api/_axios.ts
import useAuthStore from '@/store/authStore';
import axios, { AxiosError } from 'axios';
// import useAuthStore from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL;

// console.log('API_URL =', import.meta.env.VITE_API_URL);

const apiClient = axios.create({
   baseURL: API_URL,
   headers: {
      'Content-Type': 'application/json',
   },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
   (config) => {
      const token = useAuthStore.getState().token;

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

// Response interceptor for global error handling (optional)
apiClient.interceptors.response.use(
   (response) => response,
   (error: AxiosError) => {
      // Global error handling (can be customized)
      if (error.response?.status === 401) {
         // Example: Handle unauthorized errors
         useAuthStore.getState().clearAuth();
         localStorage.removeItem('x-user'); // Clear legacy token if used
         window.location.href = '/'; // Force redirect
      }
      return Promise.reject(error);
   }
);

export default apiClient;
