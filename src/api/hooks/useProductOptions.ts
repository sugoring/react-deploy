import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';

import type { ProductId, ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';

const fetchProductOptions = async (productId: ProductId): Promise<ProductOptionsData[]> => {
  const { data } = await fetchInstance.get<ProductOptionsData[]>(
    `/api/products/${productId}/options`,
  );
  return data;
};

export const useProductOptionsQuery = (
  { productId }: { productId: ProductId },
  options?: Omit<
    UseQueryOptions<
      ProductOptionsData[],
      Error,
      ProductOptionsData[],
      ['ProductOptions', ProductId]
    >,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<ProductOptionsData[], Error> => {
  return useQuery({
    queryKey: ['ProductOptions', productId],
    queryFn: () => fetchProductOptions(productId),
    ...options,
  });
};
