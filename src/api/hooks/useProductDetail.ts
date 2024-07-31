import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

export interface ProductDataRequestParams {
  productId: number;
}

const fetchProductData = async ({ productId }: ProductDataRequestParams): Promise<ProductData> => {
  const { data } = await fetchInstance.get<ProductData>(`/api/products/${productId}`);
  return data;
};

export const useProductDataQuery = (
  { productId }: ProductDataRequestParams,
  options?: Omit<UseQueryOptions<ProductData, Error, ProductData, [string, number]>, 'queryKey' | 'queryFn'>
): UseQueryResult<ProductData, Error> => {
  return useQuery({
    queryKey: ['ProductData', productId],
    queryFn: () => fetchProductData({ productId }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};