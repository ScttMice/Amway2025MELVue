import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ContentTypeEnum } from "@/enums/requestEnum";
import { showToast } from 'vant';
import "vant/es/toast/style";


const service: AxiosInstance = Axios.create({
  withCredentials: false,
  timeout: 5000,
  headers: {
    "Content-Type": ContentTypeEnum.FORM_URLENCODED
  },
  baseURL: import.meta.env.VITE_BASE_API,
});


service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 200) {
      showToast(res.msg);
      return Promise.reject(res.msg || 'Error');
    } else {
      return res;
    }
  },
  (error: AxiosError) => {
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

export default service;

