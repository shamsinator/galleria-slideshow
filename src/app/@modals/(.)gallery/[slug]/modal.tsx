import { fetchPaintingBySlug } from "@/_services/getGallery";
import { ModalImage } from "@/app/gallery/[slug]/ModalImage";
import { Modal } from "@/_components/Modal";

export type PhotoData = {
  id: number;
  title: string;
  path: string;
};

type Props = {
  params: {
    slug: string;
  };
};

/**
 * A modal component that displays a PhotoDisplay component based on a given slug.
 *
 * When the modal is opened, it fetches the photo data from the server and displays
 * the PhotoDisplay component inside the modal.
 *
 * @param {Props} props - The props object containing the slug of the photo to be displayed.
 * @returns {JSX.Element} The modal component with the PhotoDisplay component inside.
 */
export default async function GalleryModal({ params: { slug } }: Props) {
  const photoData = await fetchPaintingBySlug(slug);

  if (!photoData?.slug) {
    return <h1 className="text-center">No Photo Found.</h1>;
  }

  return (
    <Modal>
      <ModalImage
        imageUrl={photoData.images.hero.large}
        altText={photoData.name}
      />
    </Modal>
  );
}
