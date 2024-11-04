"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { clientGalleryService } from "@/_services/gallery/client";

export default function SlideshowButton({
  className = "",
}: {
  className?: string;
}) {
  const pathname = usePathname();

  // Fetch paintings and set the URL for the first artwork using TanStack Query
  const {
    data: paintings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paintings"],
    queryFn: async () => await clientGalleryService.getAllPaintings(),
  });

  // Extract the URL for the first artwork
  const firstArtworkURL = useMemo(() => {
    if (paintings && paintings.length > 0) {
      return encodeURI(`/gallery/${paintings[0].slug}`);
    }
    return "/";
  }, [paintings]);

  // Determine button text and URL based on the current pathname
  const { buttonText, buttonUrl } = useMemo(() => {
    const inGallery = pathname.startsWith("/gallery");
    return {
      buttonText: inGallery ? "stop slideshow" : "start slideshow",
      buttonUrl: inGallery ? "/" : firstArtworkURL,
    };
  }, [pathname, firstArtworkURL]);

  const linkClassNames = `tracking-wider leading-4 font-serif text-gray-500 uppercase hover:text-black transition-colors cursor-pointer ${className}`;

  // Handle loading and error states
  if (isLoading) {
    return (
      <span className={linkClassNames}>
        Loading<span className="loading loading-spinner loading-sm ml-2"></span>
      </span>
    );
  }

  if (isError) {
    return <span className={linkClassNames}>Error loading slideshow</span>;
  }

  return (
    <Link href={buttonUrl} className={linkClassNames}>
      {buttonText}
    </Link>
  );
}
