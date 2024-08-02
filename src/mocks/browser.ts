import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/mocks/categories.mock';
import { loginMockHandler } from '@/api/mocks/login.mock';
import { orderHandlers } from '@/api/mocks/order.mock';
import { productDetailMockHandler } from '@/api/mocks/productDetail.mock';
import { productOptionsMockHandler } from '@/api/mocks/productOptions.mock';
import { productsMockHandler } from '@/api/mocks/products.mock';
import { wishlistMockHandlers } from '@/api/mocks/wishlist.mock';
export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...productDetailMockHandler,
  ...productOptionsMockHandler,
  ...loginMockHandler,
  ...wishlistMockHandlers,
  ...orderHandlers,
);
