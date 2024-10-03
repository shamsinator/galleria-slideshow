"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface ModalProps {
  modal: React.ReactNode;
}

export default function ClientModal({ modal }: ModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get("modal") === "true";

  //   console.log("Search Params:", searchParams.toString());
  //   console.log("Is Modal Open:", isModalOpen);
  //   console.log("Modal Element:", modalRef.current);

  useEffect(() => {
    if (modalRef.current && !modalRef.current.open && isModalOpen) {
      modalRef.current.showModal();
    }

    return () => {
      if (modalRef.current && modalRef.current.open) {
        modalRef.current.close();
      }
    };
  }, [isModalOpen]);

  function onHide() {
    router.back();
  }

  if (!isModalOpen) return null;

  const modalRoot = document.getElementById("modal-root-id");
  if (!modalRoot) return null;

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={onHide}
      className="shadow-teal-700 shadow-md border border-teal-600 flex flex-col p-2 rounded-md dark:bg-black dark:bg-opacity-95 dark:text-gray-100"
    >
      <span onClick={onHide} className="flex justify-end cursor-pointer">
        X
      </span>
      {modal}
    </dialog>,
    modalRoot
  );
}
