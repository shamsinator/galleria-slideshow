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
};
