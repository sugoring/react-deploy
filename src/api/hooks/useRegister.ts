import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

interface RegisterRequestBody {
  email: string;
  password: string;
}

interface RegisterSuccessResponse {
  email: string;
  token: string;
}

interface ErrorResponse {
  message: string;
}

const register = async (registerData: RegisterRequestBody): Promise<RegisterSuccessResponse> => {
  try {
    const { data } = await fetchInstance.post<RegisterSuccessResponse>(
      '/api/members/register',
      registerData,
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorData = error.response.data as ErrorResponse;
      throw new Error(errorData.message || 'Registration failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const useRegisterMutation = (
  options?: UseMutationOptions<RegisterSuccessResponse, Error, RegisterRequestBody>,
) => {
  return useMutation<RegisterSuccessResponse, Error, RegisterRequestBody>({
    mutationFn: register,
    ...options,
  });
};
