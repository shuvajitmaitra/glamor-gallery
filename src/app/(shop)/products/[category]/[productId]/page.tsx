"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart } from "@/store/features/cartSlice";
import CartSidebar from "@/components/cart/CartSidebar";

// This is a placeholder until you connect to actual product data
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A comfortable, classic white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    price: 24.99,
    discountedPrice: 19.99,
    category: "tshirts",
    images: ["/images/products/tshirt-white-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
  },
  {
    id: "2",
    name: "Black Graphic Tee",
    description: "A stylish black t-shirt with a modern graphic design. Made from soft cotton blend.",
    price: 29.99,
    discountedPrice: null,
    category: "tshirts",
    images: ["/images/products/tshirt-black-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with a slight stretch for comfort. Perfect for casual or semi-formal occasions.",
    price: 59.99,
    discountedPrice: 49.99,
    category: "jeans",
    images: ["/images/products/jeans-blue-1.jpg"],
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    colors: ["blue", "black"],
  },
  {
    id: "4",
    name: "Summer Dress",
    description: "A beautiful floral summer dress. Lightweight and perfect for warm weather.",
    price: 79.99,
    discountedPrice: 64.99,
    category: "dresses",
    images: ["/images/products/dress-floral-1.jpg"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["floral"],
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  const category = params.category as string;

  const dispatch = useDispatch();
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);

  // Find the product
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  // State for selected options
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn't find the product you're looking for.</p>
            <Link href="/products" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark">
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/products/${category}`} className="hover:text-primary">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{product.name}</span>
            </div>
          </div>

          {/* Product Detail */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div>
                <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                  {/* Product image placeholder */}
                  <span className="text-gray-500">Product Image</span>
                </div>

                {/* More images would go here */}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                {/* Price */}
                <div className="mt-4 mb-6">
                  {product.discountedPrice ? (
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-primary">${product.discountedPrice.toFixed(2)}</span>
                      <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Save ${(product.price - product.discountedPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{product.description}</p>

                {/* Options */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded-md text-sm 
                            ${selectedSize === size ? "bg-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 rounded-md text-sm 
                            ${selectedColor === color ? "bg-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 bg-gray-100 rounded-l-md hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                      className="w-14 py-1 px-2 text-center border-t border-b"
                    />
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-100 rounded-r-md hover:bg-gray-200">
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button onClick={handleAddToCart} className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Related Products - You would implement this with real data */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {MOCK_PRODUCTS.filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      {/* Product image placeholder */}
                      <span className="text-gray-500">Product Image</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-1">{relatedProduct.name}</h3>
                      <div className="flex items-center">
                        {relatedProduct.discountedPrice ? (
                          <>
                            <span className="font-bold text-primary text-sm">${relatedProduct.discountedPrice.toFixed(2)}</span>
                            <span className="ml-2 text-gray-500 text-xs line-through">${relatedProduct.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-bold text-sm">${relatedProduct.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {isCartOpen && <CartSidebar />}
    </>
  );
}
