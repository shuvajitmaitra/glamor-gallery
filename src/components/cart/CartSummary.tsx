// src/components/cart/CartSummary.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0);

  // Calculate shipping (free over $100)
  const shipping = subtotal > 100 ? 0 : 10;

  // Calculate tax (assuming 7% tax rate)
  const taxRate = 0.07;
  const tax = subtotal * taxRate;

  // Calculate total
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Subtotal</p>
          <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Shipping</p>
          <p className="text-sm font-medium text-gray-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Tax (7%)</p>
          <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-gray-900">Order total</p>
            <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className="w-full rounded-md border border-transparent bg-primary py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Checkout
        </button>

        {cartItems.length === 0 && <p className="mt-2 text-sm text-gray-500 text-center">Add items to your cart to continue</p>}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          or{" "}
          <button type="button" onClick={() => router.push("/products")} className="font-medium text-primary hover:text-primary-dark">
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
