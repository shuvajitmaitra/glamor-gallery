// src/components/products/ProductSearch.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/store/features/filterSlice";
import { useSearchProductsQuery } from "@/store/services/productsApi";

const ProductSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLDivElement>(null);

  // Skip the query if the search term is empty or too short
  const shouldSkip = !query || query.length < 2;
  const { data: searchResults, isLoading } = useSearchProductsQuery(query, {
    skip: shouldSkip,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(setSearchTerm(query));
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 2) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
          placeholder="Search products..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Search results dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : !shouldSkip && searchResults && searchResults.length > 0 ? (
            <div>
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-500">
                  {searchResults.length} results found for &quot;{query}&quot;
                </p>
              </div>
              <ul>
                {searchResults.slice(0, 5).map((product) => (
                  <li key={product.id} className="border-b border-gray-200 last:border-b-0">
                    <Link
                      href={`/products/${product.category}/${product.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center p-3 hover:bg-gray-50"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover rounded-md" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
                {searchResults.length > 5 && (
                  <li className="p-3 text-center">
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      View all {searchResults.length} results
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">No products found for &quot;{query}&quot;</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
