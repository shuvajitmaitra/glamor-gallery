// src/components/common/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleCart } from "@/store/features/cartSlice";
import ProductSearch from "../products/ProductSearch";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll event to change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white md:bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.svg" alt="Fashion Store Logo" width={40} height={40} className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">Fashion Store</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            <Link href="/" className="text-base font-medium text-gray-900 hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-base font-medium text-gray-900 hover:text-primary">
              All Products
            </Link>
            <Link href="/products/tshirts" className="text-base font-medium text-gray-900 hover:text-primary">
              T-Shirts
            </Link>
            <Link href="/products/jeans" className="text-base font-medium text-gray-900 hover:text-primary">
              Jeans
            </Link>
            <Link href="/products/dresses" className="text-base font-medium text-gray-900 hover:text-primary">
              Dresses
            </Link>
          </nav>

          {/* Search, Cart, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-full max-w-xs">
              <ProductSearch />
            </div>

            <button
              type="button"
              onClick={() => dispatch(toggleCart())}
              className="relative p-1 rounded-full text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Shopping cart"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1 rounded-full text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-2 px-2">
          <ProductSearch />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                href="/products/tshirts"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                T-Shirts
              </Link>
              <Link
                href="/products/jeans"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Jeans
              </Link>
              <Link
                href="/products/dresses"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dresses
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
