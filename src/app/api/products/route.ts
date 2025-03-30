// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";

// Sample products data - in a real app, this would come from a database
const products = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A comfortable, classic white t-shirt made from 100% organic cotton.",
    price: 24.99,
    discountedPrice: 19.99,
    images: ["/images/products/tshirt-white-1.jpg", "/images/products/tshirt-white-2.jpg", "/images/products/tshirt-white-3.jpg"],
    category: "tshirts",
    subcategory: "basic",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
    inStock: true,
    featured: true,
    isNew: true,
    tags: ["bestseller", "organic", "basics"],
    specifications: {
      Material: "100% Organic Cotton",
      Fit: "Regular",
      Care: "Machine wash cold",
      Origin: "Made in Portugal",
    },
    createdAt: "2023-10-15T12:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with a slight stretch for comfort.",
    price: 69.99,
    discountedPrice: null,
    images: ["/images/products/jeans-blue-1.jpg", "/images/products/jeans-blue-2.jpg"],
    category: "jeans",
    subcategory: "slim",
    sizes: ["30x30", "32x30", "32x32", "34x32", "36x32"],
    colors: ["blue", "black"],
    inStock: true,
    featured: false,
    isNew: false,
    tags: ["bestseller", "denim"],
    specifications: {
      Material: "98% Cotton, 2% Elastane",
      Fit: "Slim",
      Care: "Machine wash cold",
      Origin: "Imported",
    },
    createdAt: "2023-08-05T14:25:00Z",
    updatedAt: "2023-12-10T09:15:00Z",
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    description: "A beautiful floral dress perfect for summer days.",
    price: 59.99,
    discountedPrice: 45.99,
    images: ["/images/products/dress-floral-1.jpg", "/images/products/dress-floral-2.jpg"],
    category: "dresses",
    subcategory: "summer",
    sizes: ["XS", "S", "M", "L"],
    colors: ["blue", "pink"],
    inStock: true,
    featured: true,
    isNew: true,
    tags: ["summer", "floral"],
    specifications: {
      Material: "100% Viscose",
      Fit: "Regular",
      Care: "Hand wash only",
      Origin: "Imported",
    },
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
  },
  {
    id: "4",
    name: "Leather Jacket",
    description: "Classic leather jacket with a modern twist.",
    price: 199.99,
    discountedPrice: null,
    images: ["/images/products/jacket-leather-1.jpg", "/images/products/jacket-leather-2.jpg"],
    category: "jackets",
    subcategory: "leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "brown"],
    inStock: true,
    featured: true,
    isNew: false,
    tags: ["premium", "winter"],
    specifications: {
      Material: "Genuine Leather",
      Fit: "Regular",
      Care: "Professional leather cleaning only",
      Origin: "Made in Italy",
    },
    createdAt: "2023-09-10T15:20:00Z",
    updatedAt: "2023-11-15T14:10:00Z",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Check for latest parameter
  const latest = searchParams.get("latest");
  if (latest === "true") {
    // Return only new products, sorted by created date
    const latestProducts = products
      .filter((product) => product.isNew)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8); // Limit to 8 products

    return NextResponse.json(latestProducts);
  }

  // Check for category filter
  const category = searchParams.get("category");
  if (category) {
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    return NextResponse.json(filteredProducts);
  }

  // Return all products
  return NextResponse.json(products);
}
