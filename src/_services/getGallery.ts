import { Json } from "@/types/supabase";
import { Artwork } from "../../types";
import { getSupabaseBrowserClient } from "@/_hooks/useSupabaseClient";
import { generatePaintingSlug, findPaintingBySlug } from "../_utils/slugify";

// Interface for raw Supabase data
interface SupabaseGalleryItem {
  id: string;
  name: string;
  year: number;
  description: string;
  source: string;
  artist: string; // Note: This is different from Artwork type
  images: Json; // Using Json type from Supabase
  created_at: string | null;
  is_active: boolean | null;
}

// Helper function to transform Supabase data to Artwork type
const transformToArtwork = (item: SupabaseGalleryItem): Artwork => {
  const artistData = JSON.parse(item.artist);
  const images = item.images as Artwork["images"]; // Type assertion here

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

// Fetch all artworks from the Supabase database
export const fetchAllPaintings = async (): Promise<Artwork[]> => {
  const supabase = getSupabaseBrowserClient();

  try {
    const { data, error } = (await supabase.from("galleria").select("*")) as {
      data: SupabaseGalleryItem[] | null;
      error: any;
    };

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }

    // Transform the data to match Artwork type
    const paintings: Artwork[] = data.map(transformToArtwork);
    console.log("paintings: ", paintings);
    return paintings;
  } catch (error) {
    console.error("Error fetching paintings:", error);
    return [];
  }
};

// Fetch a single painting by slug for the detail page
export const fetchPaintingBySlug = async (
  slug: string
): Promise<Artwork | null> => {
  try {
    const paintings = await fetchAllPaintings();
    return findPaintingBySlug(paintings, slug);
  } catch (error) {
    console.error(`Error fetching painting with slug ${slug}:`, error);
    return null;
  }
};

// Helper function to transform Artwork to Supabase format
const transformToSupabaseFormat = (
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
    is_active: artwork.is_active ?? false,
  };
};

// Insert a new painting into the Supabase database
export const insertGalleryItem = async (
  newItem: Artwork
): Promise<Artwork | null> => {
  const supabase = getSupabaseBrowserClient();

  try {
    const supabaseItem = transformToSupabaseFormat(newItem);
    const { data, error } = await supabase
      .from("galleria")
      .insert([supabaseItem]);

    if (error) {
      throw new Error(error.message);
    }

    return data ? transformToArtwork(data[0]) : null;
  } catch (error) {
    console.error("Error inserting gallery item:", error);
    return null;
  }
};

// Update an existing painting by id
export const updateGalleryItem = async (
  id: string,
  updatedItem: Partial<Artwork>
): Promise<Artwork | null> => {
  const supabase = getSupabaseBrowserClient();

  try {
    const supabaseItem = transformToSupabaseFormat(updatedItem as Artwork);
    const { data, error } = await supabase
      .from("galleria")
      .update(supabaseItem)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data ? transformToArtwork(data[0]) : null;
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return null;
  }
};
