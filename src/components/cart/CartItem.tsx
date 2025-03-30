// src/components/cart/CartItem.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/features/cartSlice";
import { CartItem as CartItemType } from "@/store/features/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: newQuantity,
        size: item.size,
        color: item.color,
      })
    );
  };

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        id: item.id,
        size: item.size,
        color: item.color,
      })
    );
  };

  const price = item.discountedPrice || item.price;
  const totalPrice = price * item.quantity;

  return (
    <div className="flex py-4 border-b border-gray-200">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image src={item.images[0]} alt={item.name} fill sizes="96px" className="object-cover object-center" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <p className="ml-4">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Size and color info */}
          <div className="text-gray-500">
            {item.size && <span className="mr-2">Size: {item.size}</span>}
            {item.color && <span>Color: {item.color}</span>}
          </div>

          {/* Quantity selector */}
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-500">
              Qty
            </label>
            <select
              id={`quantity-${item.id}`}
              name={`quantity-${item.id}`}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="rounded-md border border-gray-300 py-1 pl-2 pr-7 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <button type="button" onClick={handleRemove} className="ml-4 text-sm font-medium text-primary hover:text-primary-dark">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
