import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type { LoginRequest, LoginResponse } from '@/types';

import { fetchInstance } from '../instance';

const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await fetchInstance.post<LoginResponse>('/api/members/login', loginData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 서버에서 에러 메시지를 제공하는 경우
      const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      throw new Error(errorMessage);
    }
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, Error, LoginRequest>,
) => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    ...options,
  });
};
