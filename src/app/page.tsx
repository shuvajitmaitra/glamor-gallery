// src/app/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CartSidebar from "@/components/cart/CartSidebar";

export default function HomePage() {
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);

  // Sample featured categories
  const featuredCategories = [
    {
      id: "tshirts",
      name: "T-Shirts",
      description: "Comfortable and stylish T-shirts for every occasion",
      image: "/images/products/tshirt-category.jpg",
    },
    {
      id: "jeans",
      name: "Jeans",
      description: "Premium quality jeans that fit just right",
      image: "/images/products/jeans-category.jpg",
    },
    {
      id: "dresses",
      name: "Dresses",
      description: "Beautiful dresses for any occasion",
      image: "/images/products/dress-category.jpg",
    },
  ];

  return (
    <>
      {/* We'll keep Header here and remove it from the layout */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white relative">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">Summer Collection 2025</h1>
            <p className="text-xl mb-8">Discover the latest trends and styles that will keep you looking fresh all summer long.</p>
            <Link
              href="/products"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md inline-block transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <div key={category.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  {/* Placeholder for category image */}
                  <span className="text-gray-500">Category Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link href={`/products/${category.id}`} className="text-primary hover:text-primary-dark font-medium">
                    Shop Collection →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Arrivals</h2>
            <Link href="/products" className="text-primary hover:text-primary-dark font-medium">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Cards - Using placeholders until API is connected */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder for product image */}
                  <span className="text-gray-500">Product Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">Product Name</h3>
                  <p className="text-gray-600 text-sm mb-2">Short product description goes here.</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$49.99</span>
                    <button className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-dark">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Summer Sale</h2>
            <p className="text-xl mb-6">Up to 50% off on selected items. Limited time offer.</p>
            <Link
              href="/products?sale=true"
              className="bg-white text-primary px-8 py-3 rounded-md inline-block hover:bg-gray-100 transition-colors"
            >
              Shop Sale
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
