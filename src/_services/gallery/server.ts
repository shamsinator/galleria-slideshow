import { Artwork } from "../../../types";
import { createSupabaseServer } from "@/_utils/createSupabaseServer";
import {
  SupabaseGalleryItem,
  transformToArtwork,
  handleSupabaseError,
} from "./utils";

export const serverGalleryService = {
  /**
   * Fetch all paintings from the Supabase database.
   *
   * @returns An array of Artwork objects
   */
  async getAllPaintings(): Promise<Artwork[]> {
    const supabase = createSupabaseServer();

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
   * Fetch a single painting by slug from the Supabase database.
   *
   * @param slug The slug of the painting to fetch
   * @returns The Artwork object with the matching slug, or null if not found
   */
  async getPaintingBySlug(slug: string): Promise<Artwork | null> {
    try {
      const paintings = await this.getAllPaintings();
      return paintings.find((painting) => painting.slug === slug) || null;
    } catch (error) {
      return handleSupabaseError(error, `fetching painting with slug ${slug}`);
    }
  },
};
