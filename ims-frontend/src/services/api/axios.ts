import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Handle token refresh logic here
        // const { data } = await axios.post('/auth/refresh');
        // localStorage.setItem('token', data.token);
        // api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        // return api(originalRequest);
        return Promise.reject(error);
      } catch (refreshError) {
        // Handle logout
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
