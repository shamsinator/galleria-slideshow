import { Artwork } from "../../types";
import { generatePaintingSlug, findPaintingBySlug } from "../_utils/slugify";

// JSON server URL
const API_URL = "http://localhost:3500";

// Fetch all paintings from the JSON server
export const fetchAllPaintings = async (): Promise<Artwork[]> => {
  try {
    const response = await fetch(`${API_URL}/paintings`);
    if (!response.ok) {
      throw new Error("Failed to fetch paintings");
    }
    const data = await response.json();

    // Add slugs to the paintings
    const paintings: Artwork[] = data.map((painting: Artwork) => ({
      ...painting,
      slug: generatePaintingSlug(painting.name), // Use utility for slug generation
    }));

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
    return findPaintingBySlug(paintings, slug); // Use utility to find painting by slug
  } catch (error) {
    console.error(`Error fetching painting with slug ${slug}:`, error);
    return null;
  }
};
