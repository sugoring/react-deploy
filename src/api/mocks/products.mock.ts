import { rest } from 'msw';

import type { ProductData } from '@/types';

export const mockProducts: ProductData[] = [
  {
    id: 1,
    name: "아메리카노",
    price: 4500,
    imageUrl: "https://example.com/americano.jpg",
    categoryId: 1
  },
  {
    id: 2,
    name: "카페라떼",
    price: 5000,
    imageUrl: "https://example.com/caffe-latte.jpg",
    categoryId: 1
  },
  {
    id: 3,
    name: "카푸치노",
    price: 5500,
    imageUrl: "https://example.com/cappuccino.jpg",
    categoryId: 1
  },
  {
    id: 4,
    name: "에스프레소",
    price: 4000,
    imageUrl: "https://example.com/espresso.jpg",
    categoryId: 1
  },
  {
    id: 5,
    name: "녹차",
    price: 4500,
    imageUrl: "https://example.com/green-tea.jpg",
    categoryId: 2
  },
  {
    id: 6,
    name: "얼그레이",
    price: 4500,
    imageUrl: "https://example.com/earl-grey.jpg",
    categoryId: 2
  },
  {
    id: 7,
    name: "카모마일",
    price: 4500,
    imageUrl: "https://example.com/chamomile.jpg",
    categoryId: 2
  },
  {
    id: 8,
    name: "크로와상",
    price: 3500,
    imageUrl: "https://example.com/croissant.jpg",
    categoryId: 3
  },
  {
    id: 9,
    name: "치즈케이크",
    price: 5500,
    imageUrl: "https://example.com/cheesecake.jpg",
    categoryId: 3
  },
  {
    id: 10,
    name: "초코 머핀",
    price: 3000,
    imageUrl: "https://example.com/choco-muffin.jpg",
    categoryId: 3
  }
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

    return res(
      ctx.status(200),
      ctx.json(paginatedProducts)
    );
  }),
];

function isSortableField(field: string): field is SortableFields {
  return ['name', 'price'].includes(field);
}