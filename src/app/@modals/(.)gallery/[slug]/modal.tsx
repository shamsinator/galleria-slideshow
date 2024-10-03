import Image from "next/image";
import { paintings } from "@/app/data";
import CloseButton from "@/_components/CloseButton";

interface ModalProps {
  params: { slug: string };
}

// Utility function to slugify the artwork name (same as in the overview)
function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// Helper function to find the artwork by slug
function findArtworkBySlug(slug: string) {
  return paintings.find((item) => slugify(item.id) === slug);
}

export default function GalleryModal({ params }: ModalProps) {
  // Find artwork based on the slug
  const artwork = findArtworkBySlug(params.slug);
  const galleryImage = artwork?.images?.gallery;

  // console.log("artwork", artwork);
  // console.log("galleryImage", galleryImage);

  // If artwork is not found, show an error message
  if (!artwork || !galleryImage) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <p className="text-white">Artwork not found</p>
        <CloseButton />
      </div>
    );
  }

  // Render the modal
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
