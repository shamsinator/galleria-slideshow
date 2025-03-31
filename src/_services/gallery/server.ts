import { Artwork } from "../../../types";
import { createSupabaseServer } from "@/_utils/createSupabaseServer";
import {
  SupabaseGalleryItem,
  transformToArtwork,
  handleSupabaseError,
} from "./utils";

export const serverGalleryService = {
  /**
   * Toggle the visibility of an artwork by its ID
   *
   * @param id The ID of the artwork to toggle
   * @returns A Promise resolving to true if successful
   */
  async toggleArtworkVisibility(id: string): Promise<boolean> {
    const supabase = createSupabaseServer();

    try {
      // First get current status
      const { data: artwork, error: fetchError } = await supabase
        .from("galleria")
        .select("is_active")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      if (!artwork) throw new Error(`Artwork with ID ${id} not found`);

      // Toggle the status
      const { error: updateError } = await supabase
        .from("galleria")
        .update({ is_active: !artwork.is_active })
        .eq("id", id);

      if (updateError) throw updateError;
      return true;
    } catch (error) {
      return handleSupabaseError(
        error,
        `toggling visibility for artwork ${id}`
      );
    }
  },

  /**
   * Fetch all paintings from the Supabase database
   *
   * @param includeInactive Whether to include inactive artworks
   * @returns An array of Artwork objects
   */
  async getAllPaintings(includeInactive = false): Promise<Artwork[]> {
    const supabase = createSupabaseServer();

    try {
      let query = supabase.from("galleria").select("*");

      // Only show active artworks unless specifically requested
      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data?.map(transformToArtwork) || [];
    } catch (error) {
      return handleSupabaseError(error, "fetching all paintings");
    }
  },

  /**
   * Fetch active paintings from the Supabase database
   *
   * @returns An array of active Artwork objects
   */
  async getActivePaintings(): Promise<Artwork[]> {
    return this.getAllPaintings(false);
  },

  /**
   * Fetch a single painting by slug from the Supabase database
   * Includes both active and inactive paintings
   *
   * @param slug The slug of the painting to fetch
   * @returns The Artwork object with the matching slug, or null if not found
   */
  async getPaintingBySlug(slug: string): Promise<Artwork | null> {
    try {
      // Get all paintings including inactive ones
      const paintings = await this.getAllPaintings(true);
      return paintings.find((painting) => painting.slug === slug) || null;
    } catch (error) {
      return handleSupabaseError(error, `fetching painting with slug ${slug}`);
    }
  },

  /**
   * Delete a painting from the Supabase database
   *
   * @param id The id of the painting to delete
   * @returns A Promise that resolves if the deletion is successful
   */
  async deletePainting(id: string): Promise<boolean> {
    const supabase = createSupabaseServer();

    try {
      const { error } = await supabase.from("galleria").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      return handleSupabaseError(error, `deleting painting ${id}`);
    }
  },
};
