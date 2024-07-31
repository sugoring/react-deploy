import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData, ProductsRequest } from '@/types';

import { fetchInstance } from '../instance';

// 실제 API 호출을 수행하는 함수
export const getProducts = async ({
  categoryId,
  page = 0,
  size = 10,
  sort = 'name,asc',
}: ProductsRequest): Promise<ProductData[]> => {
  const { data } = await fetchInstance.get<ProductData[]>('/api/products', {
    params: {
      page,
      size,
      sort,
      categoryId,
    },
  });

  return data;
};

type Params = Omit<ProductsRequest, 'page'>;

export const useGetProducts = ({
  categoryId,
  size = 10,
  sort = 'name,asc',
}: Params): UseInfiniteQueryResult<InfiniteData<ProductData[]>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, size, sort],
    queryFn: ({ pageParam = 0 }) => getProducts({ categoryId, page: pageParam, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.length,
  });
};