// src/store/features/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortOption = "newest" | "price-low-high" | "price-high-low" | "popularity";

interface FilterState {
  category: string | null;
  sizes: string[];
  colors: string[];
  priceRange: { min: number; max: number };
  sort: SortOption;
  searchTerm: string;
}

const initialState: FilterState = {
  category: null,
  sizes: [],
  colors: [],
  priceRange: { min: 0, max: 1000 },
  sort: "newest",
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    toggleSize: (state, action: PayloadAction<string>) => {
      const size = action.payload;
      if (state.sizes.includes(size)) {
        state.sizes = state.sizes.filter((s) => s !== size);
      } else {
        state.sizes.push(size);
      }
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      if (state.colors.includes(color)) {
        state.colors = state.colors.filter((c) => c !== color);
      } else {
        state.colors.push(color);
      }
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    setSort: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    resetFilters: (state) => {
      return { ...initialState, searchTerm: state.searchTerm };
    },
  },
});

export const { setCategory, toggleSize, toggleColor, setPriceRange, setSort, setSearchTerm, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
