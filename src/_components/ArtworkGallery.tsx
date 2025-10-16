"use client";

import React from "react";
import ArtworkCard from "@/_components/ArtworkCard";
import { clientGalleryService } from "@/_services/gallery/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Artwork } from "../../types";

interface ArtworkGalleryProps {
  // Add props if needed in the future
}

/**
 * A React component that displays a masonry layout of painting images.
 */
const MasonryGrid: React.FC<ArtworkGalleryProps> = () => {
  // Use React Query for better caching and performance with proper typing
  const {
    data: paintings = [],
    isLoading,
    isError,
    error,
  }: UseQueryResult<Artwork[], Error> = useQuery({
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
        <span className="loading loading-spinner loading-sm ml-2"></span>
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
