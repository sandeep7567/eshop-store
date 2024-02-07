"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IconButton } from "./icon-button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ onClose, open, className, children }) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className={"relative z-10"} onClose={onClose}>

        <div className="fixed inset-0 bg-card-foreground/60" />

        <div className="fixed inset-0 overflow-y-auto">

          <div className="flex min-h-full items-center justify-center p-4 text-center">

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={"w-full rounded-lg max-w-3xl text-left align-middle"}
              >
                <div className={
                  cn(
                    "relative w-full mx-auto flex items-center overflow-hidden bg-card rounded-md px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8",
                    className,
                  )
                }>
                  <div className="absolute right-4 top-4">
                    <IconButton
                      icon={<X size={15} className=""/>}
                      onClick={onClose}
                    />
                  </div>

                  {children}
                </div>

              </Dialog.Panel>

            </Transition.Child>

          </div>
        </div>

      </Dialog>
    </Transition>
  );
};
