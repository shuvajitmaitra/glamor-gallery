// src/components/common/Layout.tsx
"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartSidebar from "../cart/CartSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Cart Sidebar */}
      {isCartOpen && <CartSidebar />}
    </div>
  );
};

export default Layout;
