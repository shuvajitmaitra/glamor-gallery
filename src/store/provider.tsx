// src/store/provider.tsx
"use client";

import { store } from "./index";
import { Provider } from "react-redux";
import React from "react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
