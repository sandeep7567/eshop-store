import { create } from "zustand";

import { ProductTypes } from "@/types";

interface AccountModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  // data?: ProductTypes;
};

export const UseAccountModal = create<AccountModalStore>((set) => ({
  isOpen: false,
  // data: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));