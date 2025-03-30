// src/store/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
  id: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, size, color } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id && item.size === size && item.color === color);

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Add new item
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; size?: string; color?: string }>) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter((item) => !(item.id === id && item.size === size && item.color === color));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        size?: string;
        color?: string;
      }>
    ) => {
      const { id, quantity, size, color } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id && item.size === size && item.color === color);

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, setCartOpen } = cartSlice.actions;

export default cartSlice.reducer;
