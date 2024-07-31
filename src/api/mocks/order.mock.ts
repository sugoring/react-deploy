import { rest } from 'msw';

import type { OrderFormData, OrderHistory } from '@/types';

// 목업 주문 데이터
export const mockOrders: OrderHistory[] = [
  { id: 1, optionId: 101, count: 2 },
  { id: 2, optionId: 102, count: 1 },
  { id: 3, optionId: 103, count: 3 },
  { id: 4, optionId: 104, count: 1 },
  { id: 5, optionId: 105, count: 2 },
];

// MSW 핸들러 정의
export const orderHandlers = [
  // 주문 목록 조회
  rest.get('/api/orders', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 0;
    const size = Number(req.url.searchParams.get('size')) || 10;
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedOrders = mockOrders.slice(startIndex, endIndex);
    
    return res(
      ctx.status(200),
      ctx.json(paginatedOrders)
    );
  }),

  // 주문 생성
  rest.post('/api/orders', async (req, res, ctx) => {
    const orderData = await req.json() as OrderFormData;
    const newOrder: OrderHistory = {
      id: Math.floor(Math.random() * 1000) + 100,
      optionId: orderData.productId,
      count: orderData.productQuantity,
    };
    mockOrders.push(newOrder);

    return res(
      ctx.status(201),
      ctx.json(newOrder)
    );
  }),

  // 주문 취소
  rest.delete('/api/orders/:orderId', (req, res, ctx) => {
    const { orderId } = req.params;
    const orderIndex = mockOrders.findIndex(order => order.id === Number(orderId));
    
    if (orderIndex !== -1) {
      mockOrders.splice(orderIndex, 1);
      return res(
        ctx.status(200),
        ctx.json({ message: `Order ${orderId} has been cancelled.` })
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({ message: `Order ${orderId} not found.` })
      );
    }
  }),
];

