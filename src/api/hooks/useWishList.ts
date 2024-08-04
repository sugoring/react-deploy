import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { WishlistProduct } from '@/types';

import { fetchInstance } from '../instance';

// 위시 리스트를 페이지 단위로 조회하는 함수
export const useWishListQuery = (page: number = 0, size: number = 10) => {
  const fetchWishList = async (): Promise<WishlistProduct[]> => {
    const { data } = await fetchInstance.get<WishlistProduct[]>(
      `/api/wishes?page=${page}&size=${size}&sort=createdDate,desc`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return data;
  };

  return useQuery<WishlistProduct[], Error>({
    queryKey: ['wishList', page, size],
    queryFn: fetchWishList,
  });
};

// 위시 리스트에서 상품을 제거하는 함수
export const useRemoveWishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishId: number) =>
      fetchInstance.delete(`/api/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
  });
};

// 위시 리스트에 상품을 추가하는 함수
export const useAddWishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) =>
      fetchInstance.post(
        '/api/wishes',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
  });
};
