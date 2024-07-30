import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';  

export interface ProductOption {
  id: number;
  name: string;
  quantity: number;
  productId: number;
}

export interface ProductOptionsRequestParams {
  productId: number;
}

const fetchProductOptions = async ({
  productId,
}: ProductOptionsRequestParams): Promise<ProductOption[]> => {
  const { data } = await fetchInstance.get<ProductOption[]>(`/api/products/${productId}/options`);
  return data;
};

export const useProductOptionsQuery = (
  { productId }: ProductOptionsRequestParams,
  options?: Omit<UseQueryOptions<ProductOption[], AxiosError, ProductOption[], [string, number]>, 'queryKey' | 'queryFn'>
): UseQueryResult<ProductOption[], AxiosError> => {
  return useQuery({
    queryKey: ['productOptions', productId],
    queryFn: () => fetchProductOptions({ productId }),
    ...options,
  });
};