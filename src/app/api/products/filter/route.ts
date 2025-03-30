// src/app/api/products/filter/route.ts
import { NextRequest, NextResponse } from "next/server";

// Sample products data - copied from the main products API route
// In a real app, you'd use a shared data source or database
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

  // Get filter parameters
  const category = searchParams.get("category");
  const sizes = searchParams.getAll("size");
  const colors = searchParams.getAll("color");
  const priceMinStr = searchParams.get("priceMin");
  const priceMaxStr = searchParams.get("priceMax");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");

  // Parse numeric values
  const priceMin = priceMinStr ? parseFloat(priceMinStr) : undefined;
  const priceMax = priceMaxStr ? parseFloat(priceMaxStr) : undefined;

  // Filter products
  let filteredProducts = [...products];

  // Filter by search term
  if (search) {
    filteredProducts = filteredProducts.filter((product) => {
      const searchableText = `
        ${product.name} 
        ${product.description} 
        ${product.category} 
        ${product.subcategory || ""} 
        ${product.tags?.join(" ") || ""}
      `.toLowerCase();

      return searchableText.includes(search.toLowerCase());
    });
  }

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by sizes
  if (sizes.length > 0) {
    filteredProducts = filteredProducts.filter((product) => product.sizes?.some((size) => sizes.includes(size)));
  }

  // Filter by colors
  if (colors.length > 0) {
    filteredProducts = filteredProducts.filter((product) => product.colors?.some((color) => colors.includes(color)));
  }

  // Filter by price range
  if (priceMin !== undefined) {
    filteredProducts = filteredProducts.filter((product) => (product.discountedPrice || product.price) >= priceMin);
  }

  if (priceMax !== undefined) {
    filteredProducts = filteredProducts.filter((product) => (product.discountedPrice || product.price) <= priceMax);
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case "price-low-high":
        filteredProducts.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case "price-high-low":
        filteredProducts.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popularity":
        // In a real app, this would sort by actual popularity metrics
        // Here we'll just use the featured flag as a proxy
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        // Default sorting by newest
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  return NextResponse.json(filteredProducts);
}
