"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";

/**
 * A modal component that wraps the child elements in a
 * full-screen overlay container with a close button in the top right.
 *
 * The modal is displayed when the router's pathname contains the query
 * parameter "modal=true". The close button and the overlay itself can be
 * clicked to close the modal, which will remove the query parameter and
 * navigate to the same pathname.
 *
 * @param {React.ReactNode} children - The child elements to be wrapped in the modal.
 * @returns {JSX.Element} The modal component element.
 */
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    router.push(pathname);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full"
        >
          X
        </button>
        {children}
      </div>
      <div className="absolute inset-0" onClick={handleClose} />
    </div>
  );
}
