"use client";

import { useSearchParams } from "next/navigation";
import { Modal } from "@/_components/Modal";
import Image from "next/image";

interface ModalImageProps {
  imageUrl: string;
  altText: string;
}

/**
 * A modal component that displays an image if the query parameter "modal" is set to "true".
 *
 * @param {ModalImageProps} props - The props object containing the image URL and alt text.
 * @returns {JSX.Element} The modal component.
 */
export function ModalImage({ imageUrl, altText }: ModalImageProps) {
  const searchParams = useSearchParams();
  const showModal = searchParams.get("modal") === "true";

  if (!showModal) return null;

  return (
    <Modal>
      <Image src={imageUrl} alt={altText} layout="fill" objectFit="contain" />
    </Modal>
  );
}
