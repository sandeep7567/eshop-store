"use client";

import Button from "@/components/UI/button";
import { IconButton } from "@/components/UI/icon-button";
import { ColorTypes, PriceTypes, SizeTypes, SortTypes } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import React from "react";
import { Fillter } from "./fillter";
import { Sorting } from "@/components/sorting";

interface MobileFiltersProps {
  sizes: SizeTypes[];
  colors: ColorTypes[];
  prices: PriceTypes[];
  sortingData: SortTypes[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ colors, sizes, prices, sortingData }) => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Fillters
        <Plus size={20} />
      </Button>

      <Dialog
        onClose={onClose}
        open={open}
        as="div"
        className={"lg:hidden relative z-40"}
      >
        {/* Background */}
        <div className="lg:hidden fixed inset-0 bg-black opacity-40 z-40" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className={"relative h-full w-full ml-auto flex max-w-xs flex-col overflow-y-auto bg-card py-4 pb-6 shadow-xl"}>
            {/* Close Button */}
            <div className="flex items-center justify-end px-4">
              <IconButton
                icon={<X size={15}/>}
                className=""
                onClick={onClose}
              />
            </div>

            {/* Render the filters */}
            <div className="p-4">
            <Sorting
                valueKey={"sortId"}
                label={"Sort by:"}
                data={sortingData}
              />
              <Fillter
                data={sizes}
                name="Sizes"
                valueKey="sizeId"
              />
              <Fillter
                data={colors}
                name="Colors"
                valueKey="colorId"
              />
              <Fillter
                data={prices}
                name="Price Range"
                valueKey="priceId"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;