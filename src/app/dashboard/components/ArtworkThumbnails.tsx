import React from "react";
import Image from "next/image";

export const ArtworkThumbnails = ({ images, name }) => {
  const hasImages = images?.thumbnail || images?.gallery || images?.hero?.small;

  if (!hasImages) {
    return <span className="text-gray-400 text-sm">No images</span>;
  }

  return (
    <div className="flex gap-2">
      {images?.thumbnail && (
        <ImageThumbnail
          src={images.thumbnail}
          alt={`${name} thumbnail`}
          label="Thumb"
        />
      )}

      {images?.gallery && (
        <ImageThumbnail
          src={images.gallery}
          alt={`${name} gallery`}
          label="Gallery"
        />
      )}

      {images?.hero?.small && (
        <ImageThumbnail
          src={images.hero.small}
          alt={`${name} hero`}
          label="Hero"
        />
      )}
    </div>
  );
};

const ImageThumbnail = ({ src, alt, label }) => (
  <div className="relative group">
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="object-cover rounded-md"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
      <span className="text-white text-xs">{label}</span>
    </div>
  </div>
);