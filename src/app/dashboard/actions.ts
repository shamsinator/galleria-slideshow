"use server";

import { serverGalleryService } from "@/_services/gallery/server";
import { revalidatePath } from "next/cache";

/**
 * Server action to toggle the visibility of an artwork
 *
 * @param id The ID of the artwork to toggle
 * @returns Object containing success status and optional error message
 */
export async function toggleArtworkVisibility(id: string) {
  if (!id || typeof id !== "string") {
    return {
      success: false,
      error: "Invalid ID provided",
    };
  }

  try {
    const result = await serverGalleryService.toggleArtworkVisibility(id);

    if (result) {
      // Revalidate both dashboard and gallery pages
      revalidatePath("/dashboard");
      revalidatePath("/gallery");
      revalidatePath("/");

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "Failed to toggle artwork visibility",
      };
    }
  } catch (error) {
    console.error("Error toggling artwork visibility:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
