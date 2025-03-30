// src/components/cart/CartSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCartOpen } from "@/store/features/cartSlice";
import CartItem from "./CartItem";

const CartSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0);

  const closeCart = () => {
    dispatch(setCartOpen(false));
  };

  return (
    <div className={`fixed inset-0 overflow-hidden z-50 ${isOpen ? "visible" : "invisible"}`}>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className={`transform transition-all w-screen max-w-md ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={closeCart}>
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart content */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">Looks like you haven't added any items to your cart yet.</p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-6 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 py-4 px-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-dark"
                  >
                    Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
