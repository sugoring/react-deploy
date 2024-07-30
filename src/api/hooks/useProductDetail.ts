import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export interface ProductDetailRequestParams {
  productId: number;
}

const fetchProductDetail = async ({
  productId,
}: ProductDetailRequestParams): Promise<ProductDetail> => {
  const { data } = await fetchInstance.get<ProductDetail>(`/api/products/${productId}`);
  return data;
};

export const useProductDetailQuery = (
  { productId }: ProductDetailRequestParams,
  options?: Omit<UseQueryOptions<ProductDetail, AxiosError, ProductDetail, [string, number]>, 'queryKey' | 'queryFn'>
): UseQueryResult<ProductDetail, AxiosError> => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail({ productId }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};