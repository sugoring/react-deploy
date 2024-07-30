import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';  // fetchInstance import

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

type ProductsResponseData = {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

// 실제 API 호출을 수행하는 함수
export const getProducts = async ({
  categoryId,
  pageToken,
  maxResults,
}: RequestParams): Promise<ProductsResponseData> => {
  const { data } = await fetchInstance.get<ProductsResponseData>('/api/products', {
    params: {
      categoryId,
      pageToken,
      maxResults,
    },
  });

  return data;
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: ({ pageParam }) => getProducts({ categoryId, pageToken: pageParam, maxResults }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};