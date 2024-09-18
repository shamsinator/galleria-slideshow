import React from "react";
import { Artwork } from "../../types";
import { paintings } from "../app/data";
import ArtworkCard from "./ArtworkCard";

type MasonryGridProps = {
  paintings: Artwork[];
};

/**
 * A React component that displays a masonry layout of painting images.
 */
const MasonryGrid: React.FC<MasonryGridProps> = ({ paintings }) => {
  // If there are no paintings, show a message
  if (!paintings || paintings.length === 0) {
    return <p>No paintings available.</p>;
  }

  // Create a masonry layout from the paintings
  return (
    <div className="masonry">
      {paintings.map(({ id, images, name, artist }) => (
        <div key={id} className="masonry-item">
          {/* Each masonry item contains an ImageCard component */}
          <ArtworkCard
            name={name}
            artist={artist.name}
            path={images.thumbnail}
          />
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      paintings,
    },
    revalidate: 3600,
  };
};

export default MasonryGrid;
