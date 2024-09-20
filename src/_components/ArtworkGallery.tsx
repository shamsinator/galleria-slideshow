"use client";

import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { Artwork } from "../../types";
import ArtworkCard from "@/_components/ArtworkCard";
import { paintings } from "@/app/data";

type MasonryGridProps = {
  paintings: Artwork[];
};

/**
 * A React component that displays a masonry layout of painting images.
 */
const MasonryGrid = ({ paintings }: MasonryGridProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to show the loading spinner
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loader while data is loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <PuffLoader color="#36D7B7" size={150} />
      </div>
    );
  }

  // If there are no paintings, show a message
  if (!paintings || paintings.length === 0) {
    return <p>No paintings available.</p>;
  }

  // Create a masonry layout from the paintings
  return (
    <div className="relative">
      {/* Overlay - shown while loading */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
          <PuffLoader color="#36D7B7" size={150} />
        </div>
      )}

      {/* Masonry grid */}
      <div
        className={`masonry ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-700`}
      >
        {paintings.map(({ id, images, name, artist }) => (
          <div key={id} className="masonry-item relative">
            <ArtworkCard
              id={id}
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

export const getStaticProps = async () => {
  const paintings = await fetchPaintingsData();

  return {
    props: {
      paintings,
    },
    revalidate: 3600,
  };
};

// Mock function to simulate fetching data (replace with real fetching logic later on this point)
async function fetchPaintingsData() {
  return paintings; // TODO: Replace with real API call or data fetching logic
}

export default MasonryGrid;
