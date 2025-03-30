// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  tags?: string[];
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured?: boolean;
}

// src/types/cart.ts
import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CheckoutInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
}
