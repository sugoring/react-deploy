// src/api/mocks/categories.mock.ts

import { rest } from 'msw';

import type { CategoryData } from '@/types';

// 확장된 모의 카테고리 데이터
const mockCategories: CategoryData[] = [
  {
    id: 1,
    name: '커피',
    color: '#6F4E37',
    imageUrl: 'https://example.com/coffee.jpg',
    description: '다양한 원두로 만든 신선한 커피',
  },
  {
    id: 2,
    name: '차',
    color: '#008000',
    imageUrl: 'https://example.com/tea.jpg',
    description: '향긋한 차 컬렉션',
  },
  {
    id: 3,
    name: '베이커리',
    color: '#D2691E',
    imageUrl: 'https://example.com/bakery.jpg',
    description: '매일 아침 갓 구운 빵과 페이스트리',
  },
  {
    id: 4,
    name: '디저트',
    color: '#FF69B4',
    imageUrl: 'https://example.com/dessert.jpg',
    description: '달콤한 디저트 모음',
  },
  {
    id: 5,
    name: '스무디',
    color: '#FF7F50',
    imageUrl: 'https://example.com/smoothie.jpg',
    description: '신선한 과일로 만든 건강한 스무디',
  },
  {
    id: 6,
    name: '샌드위치',
    color: '#FFD700',
    imageUrl: 'https://example.com/sandwich.jpg',
    description: '다양한 재료로 만든 맛있는 샌드위치',
  },
  {
    id: 7,
    name: '아이스크림',
    color: '#87CEFA',
    imageUrl: 'https://example.com/ice-cream.jpg',
    description: '시원하고 달콤한 아이스크림',
  },
  {
    id: 8,
    name: '건강음료',
    color: '#32CD32',
    imageUrl: 'https://example.com/healthy-drinks.jpg',
    description: '영양가 높은 건강 음료',
  },
  {
    id: 9,
    name: '시즌 메뉴',
    color: '#9932CC',
    imageUrl: 'https://example.com/seasonal.jpg',
    description: '시즌별 특별 메뉴',
  },
  {
    id: 10,
    name: '브런치',
    color: '#F4A460',
    imageUrl: 'https://example.com/brunch.jpg',
    description: '늦은 아침을 위한 브런치 메뉴',
  },
];

// 카테고리 목록 조회 API 모킹
export const categoriesMockHandler = [
  rest.get('/api/categories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCategories));
  }),

  // 개별 카테고리 조회 API 모킹 (추가)
  rest.get('/api/categories/:categoryId', (req, res, ctx) => {
    const { categoryId } = req.params;
    const category = mockCategories.find((c) => c.id === parseInt(categoryId as string, 10));

    if (category) {
      return res(ctx.status(200), ctx.json(category));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Category not found' }));
    }
  }),
];

// 테스트용 헬퍼 함수들
export const getMockCategories = () => mockCategories;

export const getMockCategory = (categoryId: number) =>
  mockCategories.find((c) => c.id === categoryId);

export const getRandomMockCategory = () =>
  mockCategories[Math.floor(Math.random() * mockCategories.length)];
