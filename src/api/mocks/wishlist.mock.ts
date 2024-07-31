import { rest } from 'msw';

import type { WishlistProduct } from '@/types';

const mockWishlist: WishlistProduct[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: 'Product A',
      price: 100,
      imageUrl: 'http://example.com/product-a.jpg',
    },
  },
  {
    id: 2,
    product: {
      id: 2,
      name: 'Product B',
      price: 150,
      imageUrl: 'http://example.com/product-b.jpg',
    },
  },
];

export const wishlistMockHandlers = [
  // 위시 리스트 조회
  rest.get('/api/wishes', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '0';
    const size = req.url.searchParams.get('size') || '10';
    const start = parseInt(page, 10) * parseInt(size, 10);
    const end = start + parseInt(size, 10);

    return res(
      ctx.status(200),
      ctx.json(mockWishlist.slice(start, end)),
    );
  }),

  // 위시 리스트에 상품 추가
  rest.post('/api/wishes', async (req, res, ctx) => {
    const { productId } = await req.json();
    const newWish: WishlistProduct = {
      id: mockWishlist.length + 1,
      product: {
        id: productId,
        name: `Product ${String.fromCharCode(64 + productId)}`, // 예: 'Product C'
        price: 200, // 임의의 가격
        imageUrl: `http://example.com/product-${String.fromCharCode(96 + productId)}.jpg`,
      },
    };
    mockWishlist.push(newWish);

    return res(
      ctx.status(201),
      ctx.json({ productId }),
    );
  }),

  // 위시 리스트에서 상품 제거
  rest.delete('/api/wishes/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = mockWishlist.findIndex(wish => wish.id === parseInt(id as string, 10));

    if (index !== -1) {
      mockWishlist.splice(index, 1);
    }

    return res(
      ctx.status(200),
      ctx.json({}),
    );
  }),
];
