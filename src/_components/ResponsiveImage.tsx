"use client";

import Image from "next/image";
import { Artwork } from "../../types";
import { useMediaQuery } from "@/_hooks/useMediaQuery";

interface ResponsiveImageProps {
  artwork: Artwork;
}

export default function ResponsiveImage({ artwork }: ResponsiveImageProps) {
  const isSmallScreen = useMediaQuery(768);

  return (
    <Image
      src={
        isSmallScreen ? artwork.images.hero.small : artwork.images.hero.large
      }
      alt={artwork.name}
      width={isSmallScreen ? 654 : 950}
      height={isSmallScreen ? 560 : 1120}
      className="2xl:w-[500px]"
    />
  );
}
