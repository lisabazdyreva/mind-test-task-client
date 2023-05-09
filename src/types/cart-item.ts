export interface ICartItem {
  id: number;
  quantity: number;
  productId: number;
  userId: string | null;
}

export interface ICart {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: { id: number; name: string; price: number; image: string };
}

export type CartItems = ICartItem[];
export type Cart = ICart[];
