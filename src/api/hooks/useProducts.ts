import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
  categoryId: string;
  page?: number;
  size?: number;
  sort?: string;
};

type ProductsResponseData = ProductData[];

// 실제 API 호출을 수행하는 함수
export const getProducts = async ({
  categoryId,
  page = 0,
  size = 10,
  sort = 'name,asc',
}: RequestParams): Promise<ProductsResponseData> => {
  const { data } = await fetchInstance.get<ProductsResponseData>('/api/products', {
    params: {
      categoryId,
      page,
      size,
      sort,
    },
  });

  return data;
};

type Params = Pick<RequestParams, 'size' | 'categoryId' | 'sort'>;
export const useGetProducts = ({
  categoryId,
  size = 10,
  sort = 'name,asc',
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, size, sort],
    queryFn: ({ pageParam = 0 }) => getProducts({ categoryId, page: pageParam, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.length,
  });
};