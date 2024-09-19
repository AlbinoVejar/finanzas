import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('userToken');
  if(Boolean(token)){
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}
  
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  throw error;
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
}

const handleUnauthorized = () => {
  localStorage.removeItem('userToken');
  window.location.href = '/login';
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if(error.response?.status === 401){
    handleUnauthorized()
  }
  return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}