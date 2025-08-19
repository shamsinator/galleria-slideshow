import { Artwork } from "../../../types";
import { createSupabaseServer } from "@/_utils/createSupabaseServer";
import {
  handleSupabaseError,
  SupabaseGalleryItem,
  transformToArtwork,
} from "./utils";
import { CreateArtworkData } from "@/app/dashboard/actions";

export const serverGalleryService = {
  /**
   * Toggle the visibility of an artwork by its ID
   *
   * @param id The ID of the artwork to toggle
   * @returns A Promise resolving to true if successful
   * @throws Error if the operation fails
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
      handleSupabaseError(error, `toggling visibility for artwork ${id}`);
      return false;
    }
  },

  /**
   * Fetch all paintings from the Supabase database with optional filtering
   *
   * @param options Configuration options for the query
   * @returns An array of Artwork objects
   */
  async getAllPaintings({ includeInactive = false } = {}): Promise<Artwork[]> {
    const supabase = createSupabaseServer();

    try {
      let query = supabase
        .from("galleria")
        .select<string, SupabaseGalleryItem>("*")
        .order("created_at", { ascending: false }); // Add ordering for consistent results

      // Only show active artworks unless specifically requested
      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data?.map(transformToArtwork) || [];
    } catch (error) {
      handleSupabaseError(error, "fetching paintings");
      return [];
    }
  },

  /**
   * Creates a new artwork matching the SQL schema
   *
   * @param {CreateArtworkData} artworkData - The artwork data to create
   * @returns {Promise<{id: string}>} - The created artwork with id
   */
  async createArtwork(artworkData: CreateArtworkData): Promise<{ id: string }> {
    const supabase = createSupabaseServer();
    const storagePath = await createArtworkStorage(artworkData.name);

    // Clean up empty strings to null for optional fields
    const cleanImages = {
      hero: {
        large: artworkData.images.hero?.large?.trim() || null,
        small: artworkData.images.hero?.small?.trim() || null,
      },
      gallery: artworkData.images.gallery?.trim() || null,
      thumbnail: artworkData.images.thumbnail?.trim() || null,
    };

    const cleanArtist = {
      name: artworkData.artist.name.trim(),
      image: artworkData.artist.image?.trim() || null,
    };

    const { data: newArtwork, error } = await supabase
      .from("galleria")
      .insert({
        // Basic fields
        name: artworkData.name.trim(),
        year: artworkData.year,
        description: artworkData.description?.trim() || null,
        source: artworkData.source?.trim() || null,

        // JSON fields
        artist: cleanArtist,
        images: cleanImages,

        storage_path: storagePath,

        // System fields
        is_active: artworkData.isActive ?? true,
        created_at: artworkData.createdAt || new Date(),
      })
      .select()
      .single();

    if (error) throw error;

    return { id: newArtwork.id };
  },

  /**
   * Fetch active paintings from the Supabase database
   *
   * @param options Optional parameters for pagination and ordering
   * @returns An array of active Artwork objects
   */
  async getActivePaintings(options = {}): Promise<Artwork[]> {
    return this.getAllPaintings({ ...options, includeInactive: false });
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
      const paintings = await this.getAllPaintings({
        includeInactive: true,
      });
      return paintings.find((painting) => painting.slug === slug) || null;
    } catch (error) {
      return handleSupabaseError(error, `fetching painting with slug ${slug}`);
    }
  },

  /**
   * Delete a painting from the Supabase database
   *
   * @param id The id of the painting to delete
   * @returns A Promise that resolves to true if the deletion is successful, false otherwise
   */
  async deletePainting(id: string): Promise<boolean> {
    const supabase = createSupabaseServer();

    try {
      const { error } = await supabase.from("galleria").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      handleSupabaseError(error, `deleting painting ${id}`);
      return false;
    }
  },
};

function createArtworkStorage(name: string) {
  throw new Error("Function not implemented.");
}
