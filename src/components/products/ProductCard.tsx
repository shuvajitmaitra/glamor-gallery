// src/components/products/ProductCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined,
        color: product.colors && product.colors.length > 0 ? product.colors[0] : undefined,
      })
    );
  };

  const discountPercentage = product.discountedPrice ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Badge for new products */}
      {product.isNew && (
        <div className="absolute top-2 right-2 z-10 bg-primary-dark text-white px-2 py-1 text-xs font-medium rounded">New</div>
      )}

      {/* Sale badge */}
      {product.discountedPrice && (
        <div className="absolute top-2 left-2 z-10 bg-secondary text-white px-2 py-1 text-xs font-medium rounded">
          -{discountPercentage}%
        </div>
      )}

      {/* Product image */}
      <Link href={`/products/${product.category}/${product.id}`} className="aspect-h-1 aspect-w-1 overflow-hidden">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={product.featured}
          />
        </div>
      </Link>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/products/${product.category}/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            {product.discountedPrice ? (
              <>
                <span className="text-lg font-medium text-gray-900">${product.discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark"
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
