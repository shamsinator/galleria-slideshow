import { Artwork } from "../../../types";
import { getSupabaseBrowserClient } from "@/_hooks/useSupabaseClient";
import {
  SupabaseGalleryItem,
  transformToArtwork,
  transformToSupabaseFormat,
  handleSupabaseError,
} from "./utils";

export const clientGalleryService = {
  /**
   * Fetch all paintings from the Supabase database.
   *
   * @returns An array of Artwork objects
   */
  async getAllPaintings(): Promise<Artwork[]> {
    const supabase = getSupabaseBrowserClient();

    try {
      const { data, error } = (await supabase.from("galleria").select("*")) as {
        data: SupabaseGalleryItem[] | null;
        error: any;
      };

      if (error) throw new Error(error.message);
      if (!data) return [];

      return data.map(transformToArtwork);
    } catch (error) {
      console.error("Error fetching paintings:", error);
      return [];
    }
  },

  /**
   * Insert a new painting into the Supabase database.
   *
   * @param newItem The Artwork object to insert
   * @returns The inserted Artwork object, or null if there was an error
   */
  async insertPainting(newItem: Artwork): Promise<Artwork | null> {
    const supabase = getSupabaseBrowserClient();

    try {
      const supabaseItem = transformToSupabaseFormat(newItem);
      const { data, error } = await supabase
        .from("galleria")
        .insert([supabaseItem]);

      if (error) throw new Error(error.message);
      return data ? transformToArtwork(data[0]) : null;
    } catch (error) {
      return handleSupabaseError(error, "inserting gallery item");
    }
  },

  /**
   * Update an existing painting by id.
   *
   * @param id The id of the painting to update
   * @param updatedItem The updated Artwork object
   * @returns The updated Artwork object, or null if there was an error
   */
  async updatePainting(
    id: string,
    updatedItem: Partial<Artwork>
  ): Promise<Artwork | null> {
    const supabase = getSupabaseBrowserClient();

    try {
      const supabaseItem = transformToSupabaseFormat(updatedItem as Artwork);
      const { data, error } = await supabase
        .from("galleria")
        .update(supabaseItem)
        .eq("id", id);

      if (error) throw new Error(error.message);
      return data ? transformToArtwork(data[0]) : null;
    } catch (error) {
      return handleSupabaseError(error, "updating gallery item");
    }
  },
};
