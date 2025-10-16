import React from "react";
import Image from "next/image";

export const ArtistCell = ({ artist }) => {
  if (!artist) return <span className="text-gray-400">Unknown</span>;

  return (
    <div className="flex items-center gap-2">
      {artist.image && (
        <Image
          src={artist.image}
          alt={artist.name}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      )}
      <div>
        <div className="font-medium">{artist.name}</div>
      </div>
    </div>
  );
};