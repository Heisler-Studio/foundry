import axios from 'axios';
import { useAuthStore } from './auth/store';
import { env } from './env';

export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
});

// Simple interceptor to inject token from Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
