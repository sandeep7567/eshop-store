"use client";

import { ProductTypes } from "@/types";
import { FC } from "react";
import { Currency } from "./UI/currency";
import Button from "./UI/button";
import { ShoppingCart } from "lucide-react";
import { UseCart } from "@/hooks/use-cart";

interface InfoProps {
  data: ProductTypes;
}

export const Info: FC<InfoProps> = ({ data }) => {
  const cart = UseCart();
  return (
    <div>
      <h1 className="text-3xl font-bold text-accent-foreground">
        {data?.name}
      </h1>
      <div className="mt-3 items-end justify-between">
        <p className="text-2xl text-accent-foreground">
          <Currency value={data?.price} />
        </p>
      </div>

      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-primary">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-primary">Color:</h3>
          <div
            className="w-6 h-6 rounded-full border-border"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={() => cart.addItem(data)} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};
