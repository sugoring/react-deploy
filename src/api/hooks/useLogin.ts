import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { LoginResponse } from '@/types';

import { fetchInstance } from '../instance';

const login = async (authCode: string): Promise<LoginResponse> => {
  const { data } = await fetchInstance.get<LoginResponse>(`/login?code=${authCode}`);
  
  if (data.token) {
    fetchInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  }
  
  return data;
};

export const useLoginQuery = (
  authCode: string,
  options?: Omit<UseQueryOptions<LoginResponse, Error, LoginResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<LoginResponse, Error>({
    queryKey: ['login', authCode],
    queryFn: () => login(authCode),
    enabled: !!authCode,
    ...options,
  });
};