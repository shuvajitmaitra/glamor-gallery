// src/store/services/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "@/types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: ["Products"],
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products?category=${category}`,
      providesTags: ["Products"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: ["Products"],
    }),
    getLatestProducts: builder.query<Product[], void>({
      query: () => "products?latest=true",
      providesTags: ["Products"],
    }),
    searchProducts: builder.query<Product[], string>({
      query: (term) => `search?q=${encodeURIComponent(term)}`,
      providesTags: ["Products"],
    }),
    getFilteredProducts: builder.query<
      Product[],
      {
        category?: string;
        sizes?: string[];
        colors?: string[];
        priceMin?: number;
        priceMax?: number;
        sort?: string;
      }
    >({
      query: (params) => {
        // Convert params object to URLSearchParams
        const queryParams = new URLSearchParams();

        if (params.category) {
          queryParams.append("category", params.category);
        }

        if (params.sizes && params.sizes.length) {
          params.sizes.forEach((size) => queryParams.append("size", size));
        }

        if (params.colors && params.colors.length) {
          params.colors.forEach((color) => queryParams.append("color", color));
        }

        if (params.priceMin !== undefined) {
          queryParams.append("priceMin", params.priceMin.toString());
        }

        if (params.priceMax !== undefined) {
          queryParams.append("priceMax", params.priceMax.toString());
        }

        if (params.sort) {
          queryParams.append("sort", params.sort);
        }

        return `products/filter?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByategoryQuery,
  useGetProductQuery,
  useGetLatestProductsQuery,
  useSearchProductsQuery,
  useGetFilteredProductsQuery,
} = productsApi;
