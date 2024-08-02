import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';

interface Category {
  id: number;
  name: string;
  color: string;
  imageUrl: string;
  description: string;
}

const getCategories = async (): Promise<Category[]> => {
  const response = await fetchInstance.get<Category[]>('/api/categories');
  return response.data;
};

export const useCategoriesQuery = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
