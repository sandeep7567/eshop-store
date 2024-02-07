"use client";

import { Currency } from "@/components/UI/currency";
import { IconButton } from "@/components/UI/icon-button";
import { UseCart } from "@/hooks/use-cart";
import { ProductTypes } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface CartItemProps {
  data: ProductTypes;
}

export const CartItem: FC<CartItemProps> = ({ data }) => {
  const cart = UseCart();

  const onRemove = () => {
    cart.removeItem(data?.id);
  };

  return (
    <li className="flex py-6 border-b border-border">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data?.images[0].url}
          alt="image"
          className="object-cover object-center"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 top-0 right-0">
          <IconButton onClick={() => onRemove()} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-muted-foreground">{data?.color?.name}</p>
            <p className="text-muted-foreground ml-4 border-l border-border pl-4">
              {data?.size?.name}
            </p>
          </div>
          <Currency value={data?.price} />
        </div>
      </div>
    </li>
  );
};
