import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductTypes } from "@/types";
import { toast } from "sonner";

interface CartStore {
  items: ProductTypes[];
  addItem: (data: ProductTypes) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

export const UseCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductTypes) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("item already exist in cart");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item remove from the cart.");
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
