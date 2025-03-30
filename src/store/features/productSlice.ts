// src/store/features/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface ProductsState {
  items: Product[];
  latestProducts: Product[];
  featuredProducts: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  latestProducts: [],
  featuredProducts: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return (await response.json()) as Product[];
});

export const fetchLatestProducts = createAsyncThunk("products/fetchLatestProducts", async () => {
  const response = await fetch("/api/products?latest=true");
  if (!response.ok) {
    throw new Error("Failed to fetch latest products");
  }
  return (await response.json()) as Product[];
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setLatestProducts: (state, action: PayloadAction<Product[]>) => {
      state.latestProducts = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.latestProducts = action.payload;
      });
  },
});

export const { setProducts, setLatestProducts, setFeaturedProducts } = productSlice.actions;

export default productSlice.reducer;
