"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartSidebar from "@/components/cart/CartSidebar";

// This is a placeholder until you connect to actual product data
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 24.99,
    discountedPrice: 19.99,
    category: "tshirts",
    image: "/images/products/tshirt-white-1.jpg",
  },
  {
    id: "2",
    name: "Black Graphic Tee",
    price: 29.99,
    discountedPrice: null,
    category: "tshirts",
    image: "/images/products/tshirt-black-1.jpg",
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    price: 59.99,
    discountedPrice: 49.99,
    category: "jeans",
    image: "/images/products/jeans-blue-1.jpg",
  },
  {
    id: "4",
    name: "Summer Dress",
    price: 79.99,
    discountedPrice: 64.99,
    category: "dresses",
    image: "/images/products/dress-floral-1.jpg",
  },
];

// Category data
const CATEGORIES = [
  {
    id: "tshirts",
    name: "T-Shirts",
    count: 2,
  },
  {
    id: "jeans",
    name: "Jeans",
    count: 1,
  },
  {
    id: "dresses",
    name: "Dresses",
    count: 1,
  },
];

export default function ProductsPage() {
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);

  return (
    <>
      <Header />

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">All Products</h1>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">Products</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter sidebar */}
            <div className="hidden lg:block">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4">Categories</h2>
                <ul className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/products/${category.id}`}
                        className="flex items-center justify-between text-gray-700 hover:text-primary"
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{category.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <hr className="my-4 border-gray-200" />

                <h2 className="text-lg font-medium mb-4">Price Range</h2>
                <div className="text-gray-500 text-sm">Price filter will be implemented here.</div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PRODUCTS.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      {/* Product image placeholder */}
                      <span className="text-gray-500">Product Image</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {product.discountedPrice ? (
                          <>
                            <span className="font-bold text-primary">${product.discountedPrice.toFixed(2)}</span>
                            <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Link
                        href={`/products/${product.category}/${product.id}`}
                        className="text-primary hover:text-primary-dark text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {isCartOpen && <CartSidebar />}
    </>
  );
}
