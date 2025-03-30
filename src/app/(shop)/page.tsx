// src/app/(shop)/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartSidebar from "@/components/cart/CartSidebar";

export default function HomePage() {
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Fashion Store</h1>
            <p className="text-xl mb-8">Your one-stop destination for trendy fashion.</p>
            <Link href="/products" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      {/* Cart Sidebar */}
      {isCartOpen && <CartSidebar />}
    </>
  );
}
