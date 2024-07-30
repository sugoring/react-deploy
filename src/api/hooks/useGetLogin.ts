import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { fetchInstance } from '../instance';

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginSuccessResponse = {
  email: string;
  token: string;
};

const login = async (loginData: LoginRequestBody): Promise<LoginSuccessResponse> => {
  try {
    const { data } = await fetchInstance.post<LoginSuccessResponse>('/api/members/login', loginData);
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

export const useLogin = (
  options?: UseMutationOptions<LoginSuccessResponse, Error, LoginRequestBody>,
) => {
  return useMutation<LoginSuccessResponse, Error, LoginRequestBody>({
    mutationFn: login,
    ...options,
  });
};