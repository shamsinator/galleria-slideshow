/**
 * Function to generate a slug from a painting name
 * NOTE: this is a JS only solution, good for short term use. 
 * Adding a slug column to the database (recommended for production systems), will improve performance and reliability.
 *
 * @params  name - The name of the painting
 * @returns A slugified version of the name, suitable for use in URLs
 */
export const generatePaintingSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};
