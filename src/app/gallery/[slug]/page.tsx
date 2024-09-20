import { notFound } from "next/navigation";
import { paintings } from "../../data";

// Utility function to slugify the artwork name (same as in the overview)
function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function ArtworkDetail({
  params,
}: {
  params: { slug: string };
}) {
  // Find the artwork with the matching slug
  const artwork = paintings.find((item) => slugify(item.id) === params.slug);

  if (!artwork) {
    notFound(); // Built-in 404 handling if no artwork is found
  }

  return (
    <div>
      <h1>{artwork.name}</h1>
      <p>{artwork.artist.name}</p>
      <p>{artwork.year}</p>
      <p>{artwork.description}</p>
    </div>
  );
}
