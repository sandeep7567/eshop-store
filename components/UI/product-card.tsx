"use client";

import { MouseEventHandler } from "react";

import { ProductTypes } from "@/types";
import Image from "next/image";
import { IconButton } from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { Currency } from "./currency";
import { useRouter } from "next/navigation";
import { UsePreviewModal } from "@/hooks/use-preview-modal";
import { UseCart } from "@/hooks/use-cart";

interface ProductCardProps {
  data: ProductTypes;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = UsePreviewModal();
  const cart = UseCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const addToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-card group hover:scale-110 transition-all duration-200 hover:shadow-2xl cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images */}
      <div className="bg-muted aspect-square rounded-xl relative">
        <Image
          src={data?.images[0]?.url}
          fill
          alt="image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center ">
            <IconButton
              icon={<Expand size={20} className="text-muted-foreground" />}
              className=""
              onClick={onPreview}
            />
            <IconButton
              icon={
                <ShoppingCart size={20} className="text-muted-foreground" />
              }
              className=""
              onClick={addToCart}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p>{data?.category?.name}</p>
      </div>
      {/* Price */}
      <div className="flex justify-start items-center">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};
