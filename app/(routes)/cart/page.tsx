"use client";

import { FC, useEffect, useState } from "react";

import { UseCart } from "@/hooks/use-cart";

import { Container } from "@/components/UI/container";
import { NotFound } from "@/components/UI/not-found";

import { CartItem } from "./_components/cart-item";
import { Summary } from "./_components/summary";

interface CartPageProps {}

const CartPage: FC<CartPageProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = UseCart();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  // {JSON.stringify(cart?.items.map((item) => item ))}
  return (
    <div className="bg-card">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-accent-foreground ">
            Shopping Cart
          </h1>
          <div className="mt-12 h-full lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <NotFound message="No items added to cart" />
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item?.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
