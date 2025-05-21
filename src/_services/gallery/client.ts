import { Artwork } from "../../../types";
import { getSupabaseBrowserClient } from "@/_hooks/useSupabaseClient";
import {
  SupabaseGalleryItem,
  transformToArtwork
} from "./utils";

export const clientGalleryService = {
  /**
   * Fetch all paintings from the Supabase database.
   *
   * @returns An array of Artwork objects
   */
  async getAllPaintings({
    includeInactive = true
  }): Promise<Artwork[]> {
    const supabase = getSupabaseBrowserClient();

    try {
      let query = supabase
      .from("galleria")
      .select<string, SupabaseGalleryItem>("*");

      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      if (!data) return [];

      return data.map(transformToArtwork);
    } catch (error) {
      console.error("Error fetching paintings:", error);
      return [];
    }
  },
};
