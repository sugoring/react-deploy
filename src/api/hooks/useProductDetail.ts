import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';

import type { ProductData, ProductId } from '@/types';

import { fetchInstance } from '../instance';

const fetchProductData = async (productId: ProductId): Promise<ProductData> => {
  const { data } = await fetchInstance.get<ProductData>(`/api/products/${productId}`);
  return data;
};

export const useProductDataQuery = (
  { productId }: { productId: ProductId },
  options?: Omit<
    UseQueryOptions<ProductData, Error, ProductData, ['ProductData', ProductId]>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<ProductData, Error> => {
  return useQuery({
    queryKey: ['ProductData', productId],
    queryFn: () => fetchProductData(productId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
