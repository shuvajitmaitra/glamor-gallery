// src/app/layout.tsx
import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/store/provider";
import "@/styles/variables.css";
import "./globals.css";

// Import components directly, without relying on the Layout component initially
// We'll add the layout structure directly in this file

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fashion Store | Your One-Stop Clothing Shop",
  description: "Discover the latest trends in fashion. Shop our collection of high-quality clothing at affordable prices.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-text">
        <ReduxProvider>
          {/* Simple container for the page content */}
          {/* We removed the Header and Footer from here since they're included in the page components */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
