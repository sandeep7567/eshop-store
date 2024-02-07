import { cn } from '@/lib/utils';
import { ImageTypes } from '@/types';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { FC } from 'react'

interface GallaryTabProps {
  image: ImageTypes;
};

export const GallaryTab: FC<GallaryTabProps> = ({ image }) => {
  return (
    <Tab className={cn(
      "relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-card"
    )}>
      {({ selected }) => (
        <div>

          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <Image 
              src={image?.url}
              fill
              alt='image'
              className='object-cover object-center'
              />
          </span>
          <span className={cn(
            "absolute inset-0 rounded-md ring-2 border-none ring-offset-2",
            selected ? "ring-black" : "ring-transparent",
          )}/>
        </div>
      ) }
    </Tab>
  )
};