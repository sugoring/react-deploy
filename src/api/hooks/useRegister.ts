import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import type { LoginResponse } from '@/types';
import { authSessionStorage } from '@/utils/storage';

interface RegisterRequest {
  email: string;
  password: string;
}

const register = async (registerData: RegisterRequest): Promise<LoginResponse> => {
  const response = await fetchInstance.post<LoginResponse>('/members/register', registerData);
  return response.data;
};

export const useRegister = (
  options?: UseMutationOptions<LoginResponse, Error, RegisterRequest>,
) => {
  return useMutation<LoginResponse, Error, RegisterRequest>({
    mutationFn: register,
    ...options,
    onSuccess: (data, variables, context) => {
      authSessionStorage.set(data.token);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
