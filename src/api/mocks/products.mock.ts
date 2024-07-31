// src/api/mocks/products.mock.ts

import { rest } from 'msw';

import type { ProductData } from '@/types';

export const mockProducts: ProductData[] = [
  // 커피 (categoryId: 1)
  { id: 1, name: "아메리카노", price: 4500, imageUrl: "https://example.com/americano.jpg", categoryId: 1 },
  { id: 2, name: "카페라떼", price: 5000, imageUrl: "https://example.com/caffe-latte.jpg", categoryId: 1 },
  { id: 3, name: "카푸치노", price: 5500, imageUrl: "https://example.com/cappuccino.jpg", categoryId: 1 },
  { id: 4, name: "에스프레소", price: 4000, imageUrl: "https://example.com/espresso.jpg", categoryId: 1 },
  { id: 5, name: "바닐라 라떼", price: 5500, imageUrl: "https://example.com/vanilla-latte.jpg", categoryId: 1 },
  { id: 6, name: "카라멜 마키아토", price: 5800, imageUrl: "https://example.com/caramel-macchiato.jpg", categoryId: 1 },
  
  // 차 (categoryId: 2)
  { id: 7, name: "녹차", price: 4500, imageUrl: "https://example.com/green-tea.jpg", categoryId: 2 },
  { id: 8, name: "얼그레이", price: 4500, imageUrl: "https://example.com/earl-grey.jpg", categoryId: 2 },
  { id: 9, name: "카모마일", price: 4500, imageUrl: "https://example.com/chamomile.jpg", categoryId: 2 },
  { id: 10, name: "잉글리시 브렉퍼스트", price: 4500, imageUrl: "https://example.com/english-breakfast.jpg", categoryId: 2 },
  { id: 11, name: "페퍼민트 티", price: 4500, imageUrl: "https://example.com/peppermint-tea.jpg", categoryId: 2 },
  
  // 베이커리 (categoryId: 3)
  { id: 12, name: "크로와상", price: 3500, imageUrl: "https://example.com/croissant.jpg", categoryId: 3 },
  { id: 13, name: "치즈케이크", price: 5500, imageUrl: "https://example.com/cheesecake.jpg", categoryId: 3 },
  { id: 14, name: "초코 머핀", price: 3000, imageUrl: "https://example.com/choco-muffin.jpg", categoryId: 3 },
  { id: 15, name: "베이글", price: 3500, imageUrl: "https://example.com/bagel.jpg", categoryId: 3 },
  { id: 16, name: "시나몬 롤", price: 4000, imageUrl: "https://example.com/cinnamon-roll.jpg", categoryId: 3 },
  
  // 스무디 (categoryId: 5)
  { id: 17, name: "딸기 스무디", price: 5500, imageUrl: "https://example.com/strawberry-smoothie.jpg", categoryId: 5 },
  { id: 18, name: "블루베리 스무디", price: 5500, imageUrl: "https://example.com/blueberry-smoothie.jpg", categoryId: 5 },
  { id: 19, name: "망고 스무디", price: 5800, imageUrl: "https://example.com/mango-smoothie.jpg", categoryId: 5 },
  
  // 샌드위치 (categoryId: 6)
  { id: 20, name: "햄치즈 샌드위치", price: 5500, imageUrl: "https://example.com/ham-cheese-sandwich.jpg", categoryId: 6 },
  { id: 21, name: "에그 샐러드 샌드위치", price: 5000, imageUrl: "https://example.com/egg-salad-sandwich.jpg", categoryId: 6 },
  { id: 22, name: "치킨 아보카도 샌드위치", price: 6000, imageUrl: "https://example.com/chicken-avocado-sandwich.jpg", categoryId: 6 },
  
  // 아이스크림 (categoryId: 7)
  { id: 23, name: "바닐라 아이스크림", price: 3500, imageUrl: "https://example.com/vanilla-ice-cream.jpg", categoryId: 7 },
  { id: 24, name: "초코 아이스크림", price: 3500, imageUrl: "https://example.com/chocolate-ice-cream.jpg", categoryId: 7 },
  { id: 25, name: "민트 초코칩 아이스크림", price: 4000, imageUrl: "https://example.com/mint-choco-ice-cream.jpg", categoryId: 7 },
];

type SortableFields = keyof Pick<ProductData, 'name' | 'price'>;

export const productsMockHandler = [
  rest.get('/api/products', (req, res, ctx) => {
    const categoryId = req.url.searchParams.get('categoryId');
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '10', 10);
    const sort = req.url.searchParams.get('sort') || 'name,asc';

    let filteredProducts = mockProducts;
    if (categoryId) {
      filteredProducts = mockProducts.filter(product => product.categoryId === parseInt(categoryId, 10));
    }

    // 정렬 로직
    const [sortField, sortOrder] = sort.split(',');
    if (isSortableField(sortField)) {
      filteredProducts.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // 페이지네이션
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredProducts.length / size);

    return res(
      ctx.status(200),
      ctx.json({
        content: paginatedProducts,
        totalElements: filteredProducts.length,
        totalPages: totalPages,
        size: size,
        number: page,
      })
    );
  }),
];

function isSortableField(field: string): field is SortableFields {
  return ['name', 'price'].includes(field);
}

// 테스트용 헬퍼 함수들
export const getMockProducts = () => mockProducts;

export const getMockProductsByCategory = (categoryId: number) => 
  mockProducts.filter(p => p.categoryId === categoryId);

export const getMockProduct = (productId: number) => 
  mockProducts.find(p => p.id === productId);

export const getRandomMockProduct = () => 
  mockProducts[Math.floor(Math.random() * mockProducts.length)];