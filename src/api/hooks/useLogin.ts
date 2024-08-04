import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import type { LoginResponse } from '@/types';
import { authSessionStorage } from '@/utils/storage';

interface LoginRequest {
  email: string;
  password: string;
}

const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await fetchInstance.post<LoginResponse>('/members/login', loginData);
  return response.data;
};

export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginRequest>) => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    ...options,
    onSuccess: (data, variables, context) => {
      authSessionStorage.set(data.token);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
