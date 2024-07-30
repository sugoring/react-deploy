import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

// API 응답 데이터 타입 정의
export type CategoryResponseData = CategoryData[];

// React Query에서 사용할 쿼리 키
const categoriesQueryKey = ['categories'];

// 실제 API를 호출하는 함수
export const getCategories = async (): Promise<CategoryResponseData> => {
  const { data } = await fetchInstance.get<CategoryResponseData>('/api/categories');
  return data;
};

// useCategoriesQuery 훅
export const useCategoriesQuery = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
