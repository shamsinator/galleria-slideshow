import { Artwork } from "../../types";
import normalizeAccents from "./normalizeAccents";

// Function to generate a slug for a painting based on its name
export const generatePaintingSlug = (name: string): string => {
  const normalizeAccent = normalizeAccents(
    name.toLowerCase().replace(/\s+/g, "-")
  );
  return normalizeAccent;
};

// Function to find a painting by slug in an array of paintings
export const findPaintingBySlug = (
  paintings: Artwork[],
  slug: string
): Artwork | null => {
  return paintings.find((painting) => painting.slug === slug) || null;
};
