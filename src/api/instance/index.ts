import { QueryClient } from '@tanstack/react-query';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        const serverError = error.response.data as { message: string };
        return Promise.reject(new Error(serverError.message || '서버 에러가 발생했습니다.'));
      } else if (error.request) {
        return Promise.reject(new Error('서버로부터 응답이 없습니다.'));
      } else {
        return Promise.reject(new Error('요청 설정 중 에러가 발생했습니다.'));
      }
    },
  );

  return instance;
};

export const BASE_URL = 'http://3.36.86.203:8080';
export const fetchInstance = initInstance({
  baseURL: BASE_URL,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
