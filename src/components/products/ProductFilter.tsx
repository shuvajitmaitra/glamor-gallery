// src/components/products/ProductFilter.tsx
"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, toggleSize, toggleColor, setPriceRange, setSort, resetFilters, SortOption } from "@/store/features/filterSlice";
import { RootState } from "@/store";

const ProductFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(filter.priceRange);

  // Sample data - in a real app, these would come from an API or database
  const categories = [
    { id: "tshirts", name: "T-Shirts" },
    { id: "jeans", name: "Jeans" },
    { id: "dresses", name: "Dresses" },
    { id: "jackets", name: "Jackets" },
    { id: "shoes", name: "Shoes" },
    { id: "accessories", name: "Accessories" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "gray", name: "Gray", hex: "#808080" },
    { id: "red", name: "Red", hex: "#FF0000" },
    { id: "blue", name: "Blue", hex: "#0000FF" },
    { id: "green", name: "Green", hex: "#008000" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "popularity", label: "Popularity" },
  ];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalPriceRange({
      ...localPriceRange,
      [name]: Number(value),
    });
  };

  const applyPriceRange = () => {
    dispatch(setPriceRange(localPriceRange));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setLocalPriceRange({ min: 0, max: 1000 });
  };

  return (
    <div className="bg-white mb-6">
      {/* Mobile filter dialog */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          className="flex items-center gap-x-2 text-sm font-medium text-gray-700"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <span className="text-base font-semibold">Filters</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className={`${isFiltersOpen ? "block" : "hidden"} lg:block`}>
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
          <ul className="mt-2 space-y-2">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center">
                <input
                  id={`category-${category.id}`}
                  name="category"
                  type="radio"
                  checked={filter.category === category.id}
                  onChange={() => dispatch(setCategory(category.id))}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-b border-gray-200 py-4">
          <h3 className="text-lg font-medium text-gray-900">Sizes</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => dispatch(toggleSize(size))}
                className={`px-3 py-1 border ${
                  filter.sizes.includes(size) ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-gray-700"
                } rounded-md text-sm font-medium`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200 py-4">
          <h3 className="text-lg font-medium text-gray-900">Colors</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => dispatch(toggleColor(color.id))}
                className={`w-8 h-8 rounded-full border-2 ${
                  filter.colors.includes(color.id) ? "border-primary" : "border-gray-300"
                } flex items-center justify-center`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {filter.colors.includes(color.id) && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200 py-4">
          <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
          <div className="mt-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  name="min"
                  value={localPriceRange.min}
                  onChange={handlePriceChange}
                  min="0"
                  max={localPriceRange.max}
                  className="w-24 ml-1 p-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <span className="text-sm text-gray-500">to</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  name="max"
                  value={localPriceRange.max}
                  onChange={handlePriceChange}
                  min={localPriceRange.min}
                  className="w-24 ml-1 p-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            <button
              onClick={applyPriceRange}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-lg font-medium text-gray-900">Sort By</h3>
          <select
            value={filter.sort}
            onChange={(e) => dispatch(setSort(e.target.value as SortOption))}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            onClick={handleReset}
            className="w-full py-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-medium rounded-md"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
