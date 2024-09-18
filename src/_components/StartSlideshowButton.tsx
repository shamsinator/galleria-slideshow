import React from "react";
import Link from "next/link";
// import { twMerge } from "tailwind-merge";

const StartSlideshowButton = () => {
  return (
    <Link
      href={"/"}
      className="tracking-wider leading-4 font-serif text-gray-500 uppercase hover:text-black transition-colors cursor-pointer"
    >
      Start Slideshow
    </Link>
  );
};

export default StartSlideshowButton;
