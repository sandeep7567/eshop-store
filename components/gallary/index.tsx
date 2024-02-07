"use client";

import { ImageTypes } from "@/types";

import { Tab } from "@headlessui/react";
import { GallaryTab } from "@/components/gallary/gallary-tab";
import Image from "next/image";

interface GallaryProps {
  images: ImageTypes[];
}

const Gallary: React.FC<GallaryProps> = ({ images }) => {
  return (
    <Tab.Group as={"div"} className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List
          className={
            "grid grid-cols-4 gap-6"
          }
        >
          {images.map((image) => (
            // Gallary tab selection for multiple tab images for a single product
            <GallaryTab key={image?.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className={"aspect-square w-full"}>
        {images.map((image) => (
          <Tab.Panel key={image?.id}>
            <div className="relative aspect-square w-full h-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={image?.url}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallary;
