import { rest } from 'msw';

import type { ProductId, ProductOptionsData } from '@/types';

// 모의 상품 옵션 데이터
const mockProductOptions: Record<ProductId, ProductOptionsData[]> = {
  // 커피 (1-6)
  1: [
    { id: 1, name: "ICE", quantity: 100, productId: 1 },
    { id: 2, name: "HOT", quantity: 100, productId: 1 },
    { id: 3, name: "LARGE", quantity: 50, productId: 1 },
  ],
  2: [
    { id: 4, name: "ICE", quantity: 100, productId: 2 },
    { id: 5, name: "HOT", quantity: 100, productId: 2 },
    { id: 6, name: "LARGE", quantity: 50, productId: 2 },
  ],
  3: [
    { id: 7, name: "ICE", quantity: 100, productId: 3 },
    { id: 8, name: "HOT", quantity: 100, productId: 3 },
  ],
  4: [
    { id: 9, name: "SINGLE", quantity: 100, productId: 4 },
    { id: 10, name: "DOUBLE", quantity: 50, productId: 4 },
  ],
  5: [
    { id: 11, name: "ICE", quantity: 100, productId: 5 },
    { id: 12, name: "HOT", quantity: 100, productId: 5 },
    { id: 13, name: "SOY MILK", quantity: 30, productId: 5 },
  ],
  6: [
    { id: 14, name: "ICE", quantity: 100, productId: 6 },
    { id: 15, name: "HOT", quantity: 100, productId: 6 },
  ],

  // 차 (7-11)
  7: [
    { id: 16, name: "HOT", quantity: 100, productId: 7 },
    { id: 17, name: "LARGE", quantity: 50, productId: 7 },
  ],
  8: [
    { id: 18, name: "ICE", quantity: 100, productId: 8 },
    { id: 19, name: "HOT", quantity: 100, productId: 8 },
  ],
  9: [
    { id: 20, name: "HOT", quantity: 100, productId: 9 },
  ],
  10: [
    { id: 21, name: "HOT", quantity: 100, productId: 10 },
    { id: 22, name: "LARGE", quantity: 50, productId: 10 },
  ],
  11: [
    { id: 23, name: "ICE", quantity: 100, productId: 11 },
    { id: 24, name: "HOT", quantity: 100, productId: 11 },
  ],

  // 베이커리 (12-16)
  12: [
    { id: 25, name: "ORIGINAL", quantity: 50, productId: 12 },
    { id: 26, name: "CHOCOLATE", quantity: 30, productId: 12 },
  ],
  13: [
    { id: 27, name: "ORIGINAL", quantity: 30, productId: 13 },
    { id: 28, name: "STRAWBERRY", quantity: 20, productId: 13 },
  ],
  14: [
    { id: 29, name: "ORIGINAL", quantity: 40, productId: 14 },
  ],
  15: [
    { id: 30, name: "PLAIN", quantity: 50, productId: 15 },
    { id: 31, name: "SESAME", quantity: 30, productId: 15 },
  ],
  16: [
    { id: 32, name: "ORIGINAL", quantity: 40, productId: 16 },
    { id: 33, name: "EXTRA CINNAMON", quantity: 20, productId: 16 },
  ],

  // 스무디 (17-19)
  17: [
    { id: 34, name: "REGULAR", quantity: 50, productId: 17 },
    { id: 35, name: "LARGE", quantity: 30, productId: 17 },
  ],
  18: [
    { id: 36, name: "REGULAR", quantity: 50, productId: 18 },
    { id: 37, name: "LARGE", quantity: 30, productId: 18 },
  ],
  19: [
    { id: 38, name: "REGULAR", quantity: 50, productId: 19 },
    { id: 39, name: "LARGE", quantity: 30, productId: 19 },
  ],

  // 샌드위치 (20-22)
  20: [
    { id: 40, name: "TOASTED", quantity: 30, productId: 20 },
    { id: 41, name: "NOT TOASTED", quantity: 30, productId: 20 },
  ],
  21: [
    { id: 42, name: "WHITE BREAD", quantity: 30, productId: 21 },
    { id: 43, name: "WHEAT BREAD", quantity: 30, productId: 21 },
  ],
  22: [
    { id: 44, name: "REGULAR", quantity: 30, productId: 22 },
    { id: 45, name: "EXTRA AVOCADO", quantity: 20, productId: 22 },
  ],

  // 아이스크림 (23-25)
  23: [
    { id: 46, name: "CONE", quantity: 50, productId: 23 },
    { id: 47, name: "CUP", quantity: 50, productId: 23 },
  ],
  24: [
    { id: 48, name: "CONE", quantity: 50, productId: 24 },
    { id: 49, name: "CUP", quantity: 50, productId: 24 },
  ],
  25: [
    { id: 50, name: "CONE", quantity: 50, productId: 25 },
    { id: 51, name: "CUP", quantity: 50, productId: 25 },
    { id: 52, name: "EXTRA CHIPS", quantity: 30, productId: 25 },
  ],
};

// MSW 핸들러
export const productOptionsMockHandler = [
  rest.get('/api/products/:productId/options', (req, res, ctx) => {
    const { productId } = req.params;
    const options = mockProductOptions[productId as unknown as ProductId];
    
    if (options) {
      return res(
        ctx.status(200),
        ctx.json(options)
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({ message: "Product options not found" })
      );
    }
  }),
];

// 테스트용 헬퍼 함수
export const getMockProductOptions = (productId: ProductId): ProductOptionsData[] | undefined => {
  return mockProductOptions[productId];
};

export const getRandomMockProductOption = (productId: ProductId): ProductOptionsData | undefined => {
  const options = mockProductOptions[productId];
  if (options && options.length > 0) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  return undefined;
};