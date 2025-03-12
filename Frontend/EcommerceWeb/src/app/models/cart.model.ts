import { Product } from './product.model';  // ✅ Correct Import

export interface CartItem {
  id: number;
  cartId: number;
  product: Product;  // ✅ Product yahan define hai
  quantity: number;
}

export interface Cart {
  id: number;
  userId: string;
  cartItems: CartItem[];
}
