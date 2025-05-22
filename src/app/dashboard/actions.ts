"use server";

import { serverGalleryService } from "@/_services/gallery/server";
import { revalidatePath } from "next/cache";

const revalidatePaths = ["/dashboard", "/gallery", "/"];

/**
 * Server action to toggle the visibility of an artwork
 * 
 * @param {string} artworkId - The ID of the artwork to toggle
 * @returns {Promise<void>}
 */
export async function toggleArtworkVisibility(artworkId: string): Promise<void> {
  try {
    await serverGalleryService.toggleArtworkVisibility(artworkId);
    
    // Revalidate both dashboard and gallery pages
    revalidatePaths.forEach((path) => {
      revalidatePath(path);
    });
  } catch (error) {
    console.error("Error toggling artwork visibility:", error);
    throw new Error("Failed to toggle artwork visibility");
  }
}

/**
 * Server action to delete an artwork from the gallery
 * 
 * @param {string} artworkId - The ID of the artwork to delete
 * @returns {Promise<void>}
 */
export async function deleteArtwork(artworkId: string): Promise<void> {
  if (!artworkId) {
    throw new Error("Artwork ID is required");
  }
  
  try {
    await serverGalleryService.deletePainting(artworkId);
    
    // Revalidate both dashboard and gallery pages
    revalidatePaths.forEach((path) => {
      revalidatePath(path);
    });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    throw new Error("Failed to delete artwork");
  }
}
