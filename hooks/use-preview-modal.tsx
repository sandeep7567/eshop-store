import { create } from "zustand";

import { ProductTypes } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  onOpen: (data: ProductTypes) => void;
  onClose: () => void;
  data?: ProductTypes;
};

export const UsePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: ProductTypes) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));