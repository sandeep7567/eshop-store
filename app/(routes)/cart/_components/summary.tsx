import Button from "@/components/UI/button";
import { Currency } from "@/components/UI/currency";
import { UseAccountModal } from "@/hooks/use-account-modal";
import { UseCart } from "@/hooks/use-cart";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export const Summary = () => {
  const searchParams = useSearchParams();
  const items = UseCart((state) => state.items);
  const removeAll = UseCart((state) => state.removeAll);

  const router = useRouter();

  const userJSON = window?.localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  const isAuth = !!user;

  const onOpen = UseAccountModal((state) => state.onOpen);

  useEffect(() => {
    if (searchParams?.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  // initial total is 0 add add on loop using item.price and getting a totalPrice;
  const totalPrice = items.reduce((total, item) => {
    return (total += Number(item.price));
  }, 0);

  const url = `${process.env.NEXT_PUBLIC_API_URL}`;
  const webhookUrl = `${process.env.NEXT_PUBLIC_API_WEBHOOK_API_URL}`;

  const onCheckout = async () => {
    const res = await axios.post(`${url}/checkout`, {
      productIds: items?.map((item) => item.id),
    });

    window.location = res.data.url;
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    router.refresh();
  };

  return (
    <div className="mt-16 h-full rounded-lg bg-muted px-4 py-6 sm:p-6 lg:col-span-5 lg:flex lg:flex-col lg:items-start lg:justify-between lg:mt-0 lg:p-8 ">
      <div className="lg:flex lg:flex-col w-full">
        <h2 className="text-lg font-medium text-muted-foreground">
          Order Summary
        </h2>
        <div className="mt-6 space-y-4 ">
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className=" text-base font-medium text-accent-foreground">
              Order total
            </div>
            <Currency value={totalPrice} />
          </div>
        </div>
      </div>

      {!isAuth && (
        <Button onClick={onOpen} className="w-full mt-6 bg-sky-500">
          Sign In
        </Button>
      )}
      {isAuth && (
        <div className="flex justify-center items-center w-full gap-x-2">
          <Button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full mt-6"
          >
            Checkout
          </Button>
          <Button onClick={onLogout} className="w-full mt-6 bg-destructive">
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};
