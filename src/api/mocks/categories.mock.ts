import { rest } from 'msw';

import type { CategoryData } from '@/types';

// 모의 카테고리 데이터
const mockCategories: CategoryData[] = [
  {
    id: 1,
    name: '카테고리1',
    color: '#FF5733',
    imageUrl: 'https://example.com/category1.jpg',
    description: '카테고리1 설명',
  },
  {
    id: 2,
    name: '카테고리2',
    color: '#33FF57',
    imageUrl: 'https://example.com/category2.jpg',
    description: '카테고리2 설명',
  },
  // 필요에 따라 더 많은 카테고리 추가
];

// 카테고리 목록 조회 API 모킹
export const categoriesMockHandler = [
  rest.get('/api/categories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCategories));
  }),
];
