"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { clientGalleryService } from "@/_services/gallery/client";

/**
 * SlideshowButton component that conditionally renders based on gallery state
 * and provides navigation between gallery and home
 */
export default function SlideshowButton({ className = "" }) {
  const pathname = usePathname();
  const inGallery = pathname.startsWith("/gallery");

  // Fetch paintings data only when needed
  const {
    data: paintings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paintings"],
    queryFn: () =>
      clientGalleryService.getAllPaintings({ includeInactive: false }),
    // Add better caching and stale data handling
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Don't refetch on window focus for better performance
    refetchOnWindowFocus: false,
  });

  // Calculate first artwork URL only when paintings data changes
  const firstArtworkURL = useMemo(() => {
    if (paintings.length > 0) {
      return `/gallery/${encodeURIComponent(paintings[0].slug)}`;
    }
    return "/";
  }, [paintings]);

  // Determine button text and URL based on current path
  const buttonConfig = useMemo(
    () => ({
      text: inGallery ? "stop slideshow" : "start slideshow",
      url: inGallery ? "/" : firstArtworkURL,
    }),
    [inGallery, firstArtworkURL],
  );

  // Base styles for link component
  const linkClassNames = `tracking-wider leading-4 font-serif text-gray-500 uppercase hover:text-black transition-colors cursor-pointer ${className}`;

  // If loading, show a loading spinner
  if (isLoading) {
    return (
      <span className={linkClassNames}>
        Loading<span className="loading loading-spinner loading-sm ml-2"></span>
      </span>
    );
  }

  if (isError) {
    console.error("Error loading slideshow data:", error);
    return <span className={linkClassNames}>Error loading slideshow</span>;
  }

  // Don't render the button if there are no paintings
  if (!paintings.length) {
    return null;
  }

  return (
    <Link href={buttonConfig.url} className={linkClassNames}>
      {buttonConfig.text}
    </Link>
  );
}
