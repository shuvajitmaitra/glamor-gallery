// src/components/cart/CheckoutForm.tsx
"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/features/cartSlice";
import { CheckoutInfo } from "@/types/cart";

interface CheckoutFormProps {
  whatsappNumber: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ whatsappNumber }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [formData, setFormData] = useState<CheckoutInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutInfo, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (errors[name as keyof CheckoutInfo]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutInfo, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Create order summary for WhatsApp message
    const orderItems = cartItems.map(
      (item) =>
        `${item.name} ${item.size ? `(Size: ${item.size})` : ""} ${item.color ? `(Color: ${item.color})` : ""} x${item.quantity} - $${(
          (item.discountedPrice || item.price) * item.quantity
        ).toFixed(2)}`
    );

    const subtotal = cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0);

    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.07;
    const total = subtotal + shipping + tax;

    const orderSummary = `
*Order Summary*
${orderItems.join("\n")}

*Subtotal:* $${subtotal.toFixed(2)}
*Shipping:* ${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
*Tax (7%):* $${tax.toFixed(2)}
*Total:* $${total.toFixed(2)}

*Customer Information*
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.address ? `Address: ${formData.address}` : ""}
${formData.notes ? `Notes: ${formData.notes}` : ""}
`;

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(orderSummary);

    // Format the phone number (remove any non-digit characters)
    const formattedPhone = whatsappNumber.replace(/\D/g, "");

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Clear cart
    dispatch(clearCart());

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
            errors.fullName ? "border-red-500" : ""
          }`}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address (Optional)
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Order Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting || cartItems.length === 0}
          className="w-full rounded-md border border-transparent bg-primary py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Complete Order via WhatsApp"}
        </button>
      </div>

      <p className="text-sm text-gray-500">
        * Required fields. By completing your order, you'll be directed to WhatsApp to confirm your purchase.
      </p>
    </form>
  );
};

export default CheckoutForm;
