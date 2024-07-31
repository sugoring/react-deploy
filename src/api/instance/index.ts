import { QueryClient } from '@tanstack/react-query';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        // 서버에서 에러 응답을 받았을 때
        const serverError = error.response.data as { message: string };
        return Promise.reject(new Error(serverError.message || '서버 에러가 발생했습니다.'));
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못했을 때
        return Promise.reject(new Error('서버로부터 응답이 없습니다.'));
      } else {
        // 요청 설정 중에 에러가 발생했을 때
        return Promise.reject(new Error('요청 설정 중 에러가 발생했습니다.'));
      }
    },
  );

  return instance;
};

export const BASE_URL = 'http://localhost:3000';
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

// 토큰 설정 함수 추가
export const setAuthToken = (token: string) => {
  fetchInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// 토큰 제거 함수 추가
export const removeAuthToken = () => {
  delete fetchInstance.defaults.headers.common.Authorization;
};
