// src/components/products/ProductDetails.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "../cart/AddToCartButton";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );

  // Sample color map - in a real app, you would have a more sophisticated system
  const colorMap: Record<string, string> = {
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080",
    red: "#FF0000",
    blue: "#0000FF",
    green: "#008000",
    yellow: "#FFFF00",
    purple: "#800080",
    pink: "#FFC0CB",
    orange: "#FFA500",
    brown: "#A52A2A",
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <div className="relative h-96 w-full">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 cursor-pointer rounded-md border-2 ${
                    selectedImage === index ? "border-primary" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover object-center rounded-md"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>

            {/* Pricing */}
            <div className="mt-4 flex items-center">
              {product.discountedPrice ? (
                <>
                  <p className="text-3xl font-bold text-gray-900">${product.discountedPrice.toFixed(2)}</p>
                  <p className="ml-3 text-xl text-gray-500 line-through">${product.price.toFixed(2)}</p>
                  <p className="ml-3 text-sm font-medium text-green-600">
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% off
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <div className="mt-2 text-base text-gray-700 space-y-4">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-900">Size</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border ${
                      selectedSize === size ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-gray-700"
                    } rounded-md text-sm font-medium`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-900">Color</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: colorMap[color.toLowerCase()] || color }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-900">Specifications</h2>
              <div className="mt-2 border-t border-gray-200">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-3 flex justify-between border-b border-gray-200">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <AddToCartButton product={product} selectedSize={selectedSize} selectedColor={selectedColor} />

          {/* Categories and Tags */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">Category:</span>
              <Link href={`/products/${product.category}`} className="text-primary hover:text-primary-dark">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>

              {product.subcategory && (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    href={`/products/${product.category}?subcategory=${product.subcategory}`}
                    className="text-primary hover:text-primary-dark"
                  >
                    {product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1)}
                  </Link>
                </>
              )}
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-2">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <Link key={tag} href={`/products?tag=${tag}`} className="text-primary hover:text-primary-dark">
                      {tag}
                      {tag !== product.tags![product.tags!.length - 1] && ","}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
