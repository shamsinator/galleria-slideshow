import { Json } from "@/types/supabase";
import { Artwork } from "../../../types";
import { generatePaintingSlug } from "../../_utils/slugify";

// Shared interfaces
export interface SupabaseGalleryItem {
  id: string;
  name: string;
  year: number;
  description: string;
  source: string;
  artist: string;
  images: Json;
  created_at: string | null;
  is_active: boolean | null;
}

// Shared transformation functions
export const transformToArtwork = (item: SupabaseGalleryItem): Artwork => {
  const artistData = JSON.parse(item.artist);
  const images = item.images as Artwork["images"];

  return {
    id: item.id,
    name: item.name,
    year: item.year,
    description: item.description,
    source: item.source,
    artist: artistData,
    images: images,
    is_active: item.is_active ?? false,
    slug: generatePaintingSlug(item.name),
  };
};

export const transformToSupabaseFormat = (
  artwork: Artwork
): Omit<SupabaseGalleryItem, "created_at"> => {
  return {
    id: artwork.id,
    name: artwork.name,
    year: artwork.year,
    description: artwork.description,
    source: artwork.source,
    artist: JSON.stringify(artwork.artist),
    images: artwork.images as Json,
    is_active: artwork.is_active,
  };
};

// Shared error handling
export const handleSupabaseError = (error: any, context: string) => {
  console.error(`Error ${context}:`, error);
  return null;
};
