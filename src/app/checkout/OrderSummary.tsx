"use client";

import { useEffect, useState } from "react";
import { OrderSummaryTypes } from "../../../types/cart-item";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const OrderSummary = () => {
  const [cart, setCart] = useState<OrderSummaryTypes>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cartItems");

    console.log(localStorage, "local storage");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-20 bg-muted rounded-lg"></div>
        <div className="h-20 bg-muted rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
          <div className="h-6 bg-muted rounded w-full mt-2"></div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.isbn} className="flex gap-3">
            <div className="h-16 w-12 flex-shrink-0">
              <Image
                unoptimized
                src={item.bookImageUrl || "/placeholder.svg"}
                alt={item.title || "Book image"}
                className="object-cover rounded w-full h-full"
                width={48}
                height={64}
                priority={false}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-1">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.authors.firstName} {item.authors?.middleName}{" "}
                {item.authors.lastName}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs">
                  Qty: {item.quantity}, Item price: ₱
                  {(item.price ?? 0).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-sm font-medium">
                  ₱
                  {((item.price ?? 0) * item.quantity).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between font-medium text-base pt-2">
          <span>Total</span>
          <span>
            {" "}
            ₱
            {total.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
