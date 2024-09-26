import Link from "next/link";
import Image from "next/image";
import NotFound from "@/app/not-found/page";
import { paintings } from "../../data";
import ResponsiveImage from "@/_components/ResponsiveImage";
import ResponsiveImagePlaceholder from "@/_components/ResponsiveImagePlaceholder";
import ArtworkNavigation from "@/_components/ArtworkNavigation";

import {
  LayoutContainer,
  MainContentContainer,
} from "@/_components/LayoutContainer";
import MainHeader from "@/_components/Header/MainHeader";

// Utility function to slugify the artwork name (same as in the overview)
function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// Helper function to find the artwork by slug
function findArtworkBySlug(slug: string) {
  return paintings.find((item) => slugify(item.id) === slug);
}

// NOTE: generateMetadata function is automatically invoked by Nextjs, when a page is requested.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const artwork = findArtworkBySlug(params.slug);

  if (!artwork) {
    return {
      title: "Artwork Not Found",
      description: "The artwork you are looking for does not exist.",
    };
  }

  return {
    title: artwork.name,
    description:
      artwork.description.slice(0, artwork.description.indexOf(".") + 1) ||
      "No description available.",
  };
}

export default function ArtworkDetail({
  params,
}: {
  params: { slug: string };
}) {
  const artwork = findArtworkBySlug(params.slug);
  const imageUrl = artwork?.images?.hero?.large;
  const artistImage = artwork?.artist?.image;
  const title = artwork?.name;
  const artistName = artwork?.artist?.name;

  const currentIndex = paintings.findIndex(
    (item) => slugify(item.id) === params.slug
  );

  if (!artwork) {
    return <NotFound />;
  }

  return (
    <LayoutContainer>
      <MainHeader />
      <MainContentContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:flex md:flex-col lg:grid md:justify-center md:items-center gap-20 mb-32 max-w-[1280px]">
          <div className="h-full relative md:w-full">
            {imageUrl ? (
              <ResponsiveImage artwork={artwork} />
            ) : (
              <ResponsiveImagePlaceholder />
            )}
            {/* TODO: implement lightbox feature */}
            <div className=" absolute w-56 h-32 lg:w-72 lg:h-56 lg:flex flex-col items-start justify-center bg-white -bottom-10 -left-1 p-4 md:bottom-auto md:left-auto md:w-72 md:h-48 md:p-8 md:right-[100px] md:-top-2 lg:-top-3 lg:-right-16 2xl:-top-2 2xl:-right-12 lg:p-10 2xl:pl-8 2xl:py-4 2xl:w-96 2xl:h-60">
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl text-pretty">
                {title}
              </h2>
              <h3 className="text-xs text-gray-500 my-3 md:text-sm 2xl:text-sm">
                {artistName}
              </h3>
            </div>
            <div className="absolute left-3 -bottom-28 md:left-auto md:top-48 md:right-40 lg:top-auto lg:-bottom-8 lg:-right-6">
              {artistImage ? (
                <Image
                  src={artistImage}
                  alt={title + " by " + artistName}
                  width={128}
                  height={128}
                  className="w-[70px] h-[70px] md:w-[110px] md:h-[110px] lg:w-[128px] lg:h-[128px] 2xl:w-[200px] 2xl:h-[200px]"
                />
              ) : (
                <ResponsiveImagePlaceholder />
              )}
            </div>
          </div>
          <div className="h-full flex flex-col items-start justify-center gap-10 w-full lg:w-auto md:max-w-[400px] lg:max-w-96 lg:ml-20 mt-10 lg:mt-0 text-[#7D7D7D] relative 2xl:max-w-[500px] 2xl:ml-28">
            <span className="font-bold text-[#F3F3F3] text-[90px] md:text-[150px] lg:text-[170px] absolute left-20 -top-16 xs:left-32 md:-top-24 md:-left-24 lg:-top-14 lg:left-6 2xl:text-[250px]">
              {artwork?.year || "Unknown Year"}
            </span>
            <p className="text-sm z-10 leading-6 md:text-md md:mt-6 lg:mt-0 2xl:text-xl">
              {artwork?.description || "Unknown Description"}
            </p>
            <Link
              href={artwork?.source || "/"}
              target="_blank"
              className="uppercase text-xs underline tracking-wider lg:translate-y-12 2xl:text-xl"
            >
              Go to source
            </Link>
          </div>
          <ArtworkNavigation
            paintings={paintings}
            currentIndex={currentIndex}
          />
        </div>
      </MainContentContainer>
    </LayoutContainer>
  );
}
