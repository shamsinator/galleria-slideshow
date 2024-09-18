import { Artwork } from "../../types";

// Import the painting data from a local JSON file
import data from "./data.json";

// Import utility function to remove accents from strings
import normalizeAccents from "../_utils/normalizeAccents";

// Helper function to generate a URL-friendly ID from a painting's name
const generatePaintingId = (name: string): string => {
  // Convert the name to lowercase, replace spaces with hyphens, and strip accents
  return normalizeAccents(name.toLowerCase().replace(/\s+/g, "-"));
};

// Transform the raw painting data into a format that includes a generated ID
export const paintings: Artwork[] = data.map((painting) => ({
  ...painting,
  id: generatePaintingId(painting.name), // Add an ID field to each painting
}));
