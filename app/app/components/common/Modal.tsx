"use client";

import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Button, { TButtonProps } from "@/app/components/common/Button";

type Props = {
  title?: string;
  children?: React.ReactNode;

  rightButtons?: TButtonProps[];
  leftButtons?: TButtonProps[];

  open: boolean;
  onClose?: () => void;
};

export default function Modal(props: Props) {
  const {
    title,
    children,
    open,
    onClose,
    rightButtons = [],
    leftButtons = [],
  } = props;

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function closeModal() {
    setIsOpen(false);
    onClose && onClose();
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => closeModal()}
          open={isOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

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
                <Dialog.Panel className="w-full max-w-2xl overflow-auto transform bg-white p-6 text-left align-middle shadow-xl transition-all rounded">
                  <Dialog.Title as="h3" className="text-3xl">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      {leftButtons.map((button, index) => (
                        <Button key={index} {...button} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {rightButtons.map((button, index) => (
                        <Button key={index} {...button} />
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
