import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

// React Query에서 사용할 쿼리 키
const CATEGORIES_QUERY_KEY = ['categories'];

// 실제 API를 호출하는 함수
const getCategories = async (): Promise<CategoryData[]> => {
  const { data } = await fetchInstance.get<CategoryData[]>('/api/categories');
  return data;
};

// useCategoriesQuery 훅
export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
  });
};
