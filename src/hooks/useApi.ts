// src/hooks/useApi.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
}

// Configuración de la instancia de Axios
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hook personalizado
export const useApi = () => {
  // Función para obtener el token
  const getToken = (): string => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "No se encontró un token de autenticación. Por favor, inicia sesión."
      );
    }
    return token;
  };

  // Interceptor para añadir el token a todas las peticiones
  api.interceptors.request.use((config) => {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Manejo de errores genérico
  const handleError = (error: unknown): never => {
    const apiError = error as ApiError;
    const errorMessage =
      apiError.response?.data?.message ||
      apiError.response?.data?.error ||
      apiError.message ||
      "Ocurrió un error inesperado. Por favor, intenta de nuevo.";
    Notify.failure(errorMessage);
    throw error; // Re-lanzamos el error para que el componente lo maneje si es necesario
  };

  // Métodos de petición
  const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.get(url, config);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const post = async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  // Puedes añadir más métodos como patch, delete, etc., según necesites
  const patch = async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const del = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.delete(url, config);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  return { get, post, patch, del };
};

export default useApi;
