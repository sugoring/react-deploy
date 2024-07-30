import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import type { CategoryData } from '@/types';

// API 응답 데이터 타입 정의
type CategoryResponseData = CategoryData[];

// React Query에서 사용할 쿼리 키
const CATEGORIES_QUERY_KEY = ['categories'];

// 실제 API를 호출하는 함수
const getCategories = async (): Promise<CategoryResponseData> => {
  const { data } = await fetchInstance.get<CategoryResponseData>('/api/categories');
  return data;
};

// useCategoriesQuery 훅
export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
  });
};