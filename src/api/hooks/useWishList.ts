import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchInstance } from '../instance';  

export interface WishItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface WishListResponse {
  content: WishItem[];
  totalPages: number;
  totalElements: number;
}

export const useWishListQuery = (page: number = 0, size: number = 10) => {
  const fetchWishList = async (): Promise<WishListResponse> => {
    const { data } = await fetchInstance.get<WishListResponse>(
      `/api/wishes?page=${page}&size=${size}&sort=createdDate,desc`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return data;
  };

  return useQuery<WishListResponse, Error>({
    queryKey: ['wishList', page, size],
    queryFn: fetchWishList,
  });
};

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