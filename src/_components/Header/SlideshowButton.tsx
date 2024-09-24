"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { paintings } from "@/app/data";

export default function SlideshowButton({
  className = "",
}: {
  className?: string;
}) {
  // Memoize the first artwork URL
  const firstArtworkURL = useMemo(() => {
    const firstPainting = paintings[0];
    return firstPainting ? encodeURI(`/gallery/${firstPainting.id}`) : "/";
  }, []);

  // Get current pathname
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

  return (
    <Link href={buttonUrl} className={linkClassNames}>
      {buttonText}
    </Link>
  );
}
