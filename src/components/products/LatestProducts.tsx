// src/components/products/LatestProducts.tsx
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetLatestProductsQuery } from "@/store/services/productsApi";
import { setLatestProducts } from "@/store/features/productSlice";
import ProductCard from "./ProductCard";

const LatestProducts: React.FC = () => {
  const dispatch = useDispatch();
  const { data: latestProducts, isLoading, error } = useGetLatestProductsQuery();
  const products = useSelector((state: RootState) => state.products.latestProducts);

  useEffect(() => {
    if (latestProducts) {
      dispatch(setLatestProducts(latestProducts));
    }
  }, [latestProducts, dispatch]);

  if (isLoading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Latest Arrivals</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-60 bg-gray-200 rounded-lg"></div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="mt-2 flex justify-between">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Latest Arrivals</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Unable to load latest products. Please try again later.
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Latest Arrivals</h2>
        <a href="/products?sort=newest" className="text-primary hover:text-primary-dark text-sm font-medium">
          View all
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
