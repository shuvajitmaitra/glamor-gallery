"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductFilter from "@/components/products/ProductFilter";

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

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);

  // Filter products by category
  const products = MOCK_PRODUCTS.filter((product) => product.category.toLowerCase() === category.toLowerCase());

  // Capitalize first letter for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <Header />

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{categoryName}</h1>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{categoryName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter sidebar */}
            <div className="hidden lg:block">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4">Filters</h2>
                <p className="text-gray-500 text-sm">Filter component will be implemented here.</p>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {products.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h2 className="text-xl font-medium mb-2">No products found</h2>
                  <p className="text-gray-500 mb-4">We couldn&apos;t find any products in this category.</p>
                  <Link href="/products" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
                    Browse all products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
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
                          href={`/products/${category}/${product.id}`}
                          className="text-primary hover:text-primary-dark text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {isCartOpen && <CartSidebar />}
    </>
  );
}
