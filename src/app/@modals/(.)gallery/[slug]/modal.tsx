import Image from "next/image";
import { fetchPaintingBySlug } from "@/_services/getGallery"; // Use the new fetching method
import CloseButton from "@/_components/CloseButton";

interface ModalProps {
  params: { slug: string };
}

export default async function GalleryModal({ params }: ModalProps) {
  const artwork = await fetchPaintingBySlug(params.slug);
  const galleryImage = artwork?.images?.gallery;

  if (!artwork || !galleryImage) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <p className="text-white">Artwork not found</p>
        <CloseButton />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative">
        <Image
          src={galleryImage}
          alt={artwork?.name || "Artwork Image"}
          width={800}
          height={600}
          className="rounded-md"
        />
        <CloseButton />
      </div>
    </div>
  );
}
