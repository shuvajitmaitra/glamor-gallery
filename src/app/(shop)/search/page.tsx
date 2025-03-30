// src/app/(shop)/search/page.tsx
"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSearchProductsQuery } from "@/store/services/productsApi";
import { setSearchTerm } from "@/store/features/filterSlice";
import ProductGrid from "@/components/products/ProductGrid";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const query = searchParams.get("q") || "";

  // Set search term in redux store
  useEffect(() => {
    dispatch(setSearchTerm(query));
  }, [dispatch, query]);

  // If no search query, redirect to products page
  useEffect(() => {
    if (!query) {
      router.push("/products");
    }
  }, [query, router]);

  // Fetch search results
  const {
    data: products,
    isLoading,
    error,
  } = useSearchProductsQuery(query, {
    skip: !query,
  });

  if (!query) {
    return null; // Will redirect
  }

  return (
    <div className="bg-background-light">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Search Results for "{query}"</h1>
          {products && (
            <p className="mt-2 text-sm text-gray-500">
              {products.length} {products.length === 1 ? "product" : "products"} found
            </p>
          )}
        </div>

        <div className="pt-6">
          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              Error: Could not load search results. Please try again later.
            </div>
          ) : (
            <ProductGrid products={products || []} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
