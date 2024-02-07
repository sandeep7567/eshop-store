"use client";

import { FC } from "react";
import { Modal } from "../UI/modal";
import { UsePreviewModal } from "@/hooks/use-preview-modal";
import Gallary from "@/components/gallary";
import { Info } from "@/components/info";

interface PreviewModalProps {}

export const PreviewModal: FC<PreviewModalProps> = ({}) => {
  const previewModal = UsePreviewModal();
  const product = UsePreviewModal((state) => state.data);

  if (!product) {
    return null;
  };

  return (
    <Modal open={previewModal?.isOpen} onClose={previewModal?.onClose} className="w-full">
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallary images={product?.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};
