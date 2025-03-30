// src/components/cart/AddToCartButton.tsx
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, setCartOpen } from "@/store/features/cartSlice";
import { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, selectedSize, selectedColor, className = "" }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;

    setIsAdding(true);

    dispatch(
      addToCart({
        ...product,
        quantity,
        size: selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined),
        color: selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : undefined),
      })
    );

    // Show the cart
    dispatch(setCartOpen(true));

    // Reset state
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={decrementQuantity}
          className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 py-2 px-3 border-y border-gray-300 text-center focus:outline-none focus:ring-primary focus:border-primary"
        />
        <button
          type="button"
          onClick={incrementQuantity}
          className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!product.inStock || isAdding}
        className={`w-full flex items-center justify-center px-8 py-3 border border-transparent rounded-md ${
          product.inStock ? "bg-primary text-white hover:bg-primary-dark" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${className}`}
      >
        {isAdding ? (
          <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default AddToCartButton;
