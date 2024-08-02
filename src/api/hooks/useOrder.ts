import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { OrderFormData, OrderHistory } from '@/types';

import { fetchInstance } from '../instance';

// 주문 목록을 페이지 단위로 조회하는 함수
export const useOrdersQuery = (page: number = 0, size: number = 10) => {
  const fetchOrders = async (): Promise<OrderHistory[]> => {
    const { data } = await fetchInstance.get<OrderHistory[]>(
      `/api/orders?page=${page}&size=${size}&sort=orderDateTime,desc`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return data;
  };

  return useQuery<OrderHistory[], Error>({
    queryKey: ['orders', page, size],
    queryFn: fetchOrders,
  });
};

// 새로운 주문을 생성하는 함수
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: OrderFormData) =>
      fetchInstance.post<OrderHistory>('/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// 주문을 취소하는 함수 (API 명세에는 없지만, 일반적으로 필요한 기능이므로 추가)
export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: number) =>
      fetchInstance.delete(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
