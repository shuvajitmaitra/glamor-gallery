// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "./features/cartSlice";
import productReducer from "./features/productSlice";
import filterReducer from "./features/filterSlice";
import { productsApi } from "./services/productsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    filter: filterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
