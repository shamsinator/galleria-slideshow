"use client";

import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { Artwork } from "../../types";
import ArtworkCard from "@/_components/ArtworkCard";
import { clientGalleryService } from "@/_services/gallery/client";
import { useQuery } from "@tanstack/react-query";

/**
 * A React component that displays a masonry layout of painting images.
 */
const MasonryGrid = () => {
  // Use React Query for better caching and performance
  const {
    data: paintings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paintings", "active"],
    queryFn: () =>
      clientGalleryService.getAllPaintings({ includeInactive: false }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    // Enable background refetching for better UX
    refetchOnMount: false,
    refetchOnReconnect: "always",
  });

  // Show loader while data is loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <PuffLoader color="#36D7B7" size={150} />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    console.error("Error fetching paintings:", error);
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">
          Failed to load artwork. Please try again.
        </p>
      </div>
    );
  }

  // If there are no paintings, show a message
  if (!paintings || paintings.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p>No paintings available.</p>
      </div>
    );
  }

  // Create a masonry layout from the paintings
  return (
    <div className="relative">
      {/* Masonry grid */}
      <div className={`masonry`}>
        {paintings.map(({ images, name, artist, slug }, index) => (
          <div key={`${slug}-${index}`} className="masonry-item relative">
            <ArtworkCard
              slug={slug}
              name={name}
              artist={artist.name}
              path={images.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
