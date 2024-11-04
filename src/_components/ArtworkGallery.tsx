"use client";

import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { Artwork } from "../../types";
import ArtworkCard from "@/_components/ArtworkCard";
import { clientGalleryService } from "@/_services/gallery/client";
// import { fetchAllPaintings } from "../_services/getGallery"; // Fetch paintings from the JSON server

/**
 * A React component that displays a masonry layout of painting images.
 */
const MasonryGrid = () => {
  const [paintings, setPaintings] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch paintings from the JSON server when the component mounts
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const fetchedPaintings = await clientGalleryService.getAllPaintings();
        setPaintings(fetchedPaintings);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaintings();
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
