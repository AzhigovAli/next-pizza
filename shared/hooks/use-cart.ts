import React from 'react';
import { useCartStore } from '../store';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};
export const useCart = (): ReturnProps => {
  const cartItem = useCartStore((state) => state);

  React.useEffect(() => {
    cartItem.fetchCartItems();
  }, []);

  return cartItem;
};
