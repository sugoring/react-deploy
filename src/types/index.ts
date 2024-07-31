// 로그인
export type LoginResponse = {
  email: string;
  token: string;
};

// 카테고리 
export type CategoryData = {
  id: number;
  name: string;
  description: string;
  color: string;
  imageUrl: string;
};

// 제품
export type ProductId = number;

export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
};
 
  export type ProductsRequest = {
    categoryId: string | number;
    page?: number;
    size?: number;
    sort?: string;
  };


export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};

export type GoodsDetailOptionItemData = {
  key: string;
  value: string;
  level: number;
  options: GoodsDetailOptionItemData[];
  id?: number;
  price?: number;
  stockQuantity: number;
};

// 주문
export type OrderHistory = {
  id: number;
  optionId: number;
  count: number;
};

export type OrderFormData = {
  productId: number;
  productQuantity: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};

// 위시 리스트
export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type WishlistProduct = {
  id: number;
  product: Product;
};

export type WishlistRequest = {
  page?: number;
  size?: number;
  sort?: string;
};