"use server";

import { revalidatePath } from "next/cache";
import { serverGalleryService } from "@/_services/gallery/server";

const revalidatePaths = ["/dashboard", "/gallery", "/"];

/**
 * Interface for artist data
 */
export interface ArtistData {
  name: string;
  image?: string;
}

/**
 * Interface for artwork images
 */
export interface ArtworkImages {
  hero?: {
    large?: string;
    small?: string;
  };
  gallery?: string;
  thumbnail?: string;
}

/**
 * Interface for creating new artwork (matching SQL schema)
 */
export interface CreateArtworkData {
  name: string;
  year: number;
  description?: string;
  source?: string;
  artist: ArtistData;
  images: ArtworkImages;
  isActive?: boolean;
  createdAt?: Date;
}

/**
 * Toggles the visibility of an artwork
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

/**
 * Creates a new artwork
 * 
 * @param {CreateArtworkData} artworkData - The artwork data to create
 * @returns {Promise<{success: boolean, artworkId?: string, error?: string}>}
 */
export async function createArtwork(artworkData: CreateArtworkData): Promise<{
  success: boolean;
  artworkId?: string;
  error?: string;
}> {
  try {
    // Validate required fields
    if (!artworkData.name?.trim()) {
      return { success: false, error: "Artwork title is required" };
    }
    
    if (!artworkData.artist?.name?.trim()) {
      return { success: false, error: "Artist name is required" };
    }
    
    if (!artworkData.year || artworkData.year < 1000 || artworkData.year > new Date().getFullYear()) {
      return { success: false, error: "Please enter a valid year" };
    }

    // Validate URLs if provided
    const urlFields = [
      { value: artworkData.source, name: "Source URL" },
      { value: artworkData.artist.image, name: "Artist image URL" },
      { value: artworkData.images.hero?.large, name: "Hero large image URL" },
      { value: artworkData.images.hero?.small, name: "Hero small image URL" },
      { value: artworkData.images.gallery, name: "Gallery image URL" },
      { value: artworkData.images.thumbnail, name: "Thumbnail image URL" },
    ];

    for (const field of urlFields) {
      if (field.value && !isValidUrl(field.value)) {
        return { success: false, error: `${field.name} must be a valid URL` };
      }
    }

    // Create the artwork
    const newArtwork = await serverGalleryService.createArtwork(artworkData);
    
    // Revalidate the dashboard page to show the new artwork
    revalidatePath("/dashboard");
    
    return { 
      success: true, 
      artworkId: newArtwork.id 
    };
  } catch (error) {
    console.error("Error creating artwork:", error);
    return { 
      success: false, 
      error: "Failed to create artwork. Please try again." 
    };
  }
}

/**
 * Validates if a string is a valid URL
 */
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}