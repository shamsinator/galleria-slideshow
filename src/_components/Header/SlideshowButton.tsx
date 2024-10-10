"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fetchAllPaintings } from "../../_services/getGallery"; // Fetch paintings from the JSON server

export default function SlideshowButton({
  className = "",
}: {
  className?: string;
}) {
  const [firstArtworkURL, setFirstArtworkURL] = useState<string>("/");
  const [loading, setLoading] = useState(true);

  // Fetch paintings and set the URL for the first artwork
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const paintings = await fetchAllPaintings();
        if (paintings.length > 0) {
          const firstPainting = paintings[0];
          setFirstArtworkURL(encodeURI(`/gallery/${firstPainting.slug}`)); // Use the slug from the fetched paintings
        }
      } catch (error) {
        console.error("Error fetching paintings for slideshow:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  const pathname = usePathname();

  // Determine button text and URL based on the current pathname
  const { buttonText, buttonUrl } = useMemo(() => {
    const nameUri = pathname.split("/");
    if (nameUri.length > 1 && nameUri[1] === "gallery") {
      return { buttonText: "stop slideshow", buttonUrl: "/" };
    }
    return { buttonText: "start slideshow", buttonUrl: firstArtworkURL };
  }, [pathname, firstArtworkURL]);

  // Memoize the class names
  const linkClassNames = useMemo(
    () =>
      twMerge(
        `tracking-wider leading-4 font-serif text-gray-500 uppercase hover:text-black transition-colors cursor-pointer`,
        className
      ),
    [className]
  );

  // Display loading state if still fetching
  if (loading) {
    return <span className={linkClassNames}>Loading...</span>;
  }

  return (
    <Link href={buttonUrl} className={linkClassNames}>
      {buttonText}
    </Link>
  );
}
