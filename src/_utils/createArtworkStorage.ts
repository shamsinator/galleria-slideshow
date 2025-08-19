import { createSupabaseServer } from "./createSupabaseServer";
import { generatePaintingSlug } from "./slugify";

export async function createArtworkStorage(name: string) {
  const supabase = createSupabaseServer();
  const slug = generatePaintingSlug(name);
  const storagePath = `artworks/${slug}`;

  try {
    // Create an empty file to initialize the folder
    const { error } = await supabase.storage
      .from("gallery")
      .upload(`${storagePath}/.folder`, new Blob([""]));

    if (error) throw error;
    return storagePath;
  } catch (error) {
    console.error("Error creating storage folder:", error);
    throw error;
  }
}
