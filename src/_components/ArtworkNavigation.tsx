"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Artwork } from "../../types";

interface SlideFooterProps {
  paintings: Array<Artwork>;
  currentIndex: number;
}

const ArtworkNavigation = ({ paintings, currentIndex }: SlideFooterProps) => {
  const [isLast, setIsLast] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLast(currentIndex === paintings.length - 1);
    setProgress(0);

    if (intervalRef.current) {
      // ignore ESLint
      clearInterval(intervalRef.current);
    }

    // Set a new interval for navigation
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          // When progress is full, navigate to the next artwork
          if (currentIndex < paintings.length - 1) {
            router.push(`/gallery/${paintings[currentIndex + 1].id}`); // Navigate to the next artwork
          }
          return prev;
        }
      });
    }, 60);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, paintings, router]);

  // Get the next and previous artwork
  const prevPainting = currentIndex > 0 ? paintings[currentIndex - 1] : null;
  const nextPainting =
    currentIndex < paintings.length - 1 ? paintings[currentIndex + 1] : null;

  return (
    <footer className="flex z-50 flex-col justify-between items-center w-full fixed bottom-0 left-0 px-2 lg:px-10 py-3 bg-white 2xl:px-12">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 mb-4">
        <div
          className={`h-full ${isLast ? "bg-black" : "bg-gray-500"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h3 className="text-lg font-bold">
        {paintings[currentIndex]?.name || "Unknown Name"}
      </h3>
      <small className="text-sm">
        {paintings[currentIndex]?.artist?.name || "Unknown Artist"}
      </small>

      <nav className="flex justify-between">
        {/* Previous Button */}
        {prevPainting && (
          <Link href={`/gallery/${prevPainting.id}`}>
            <button className="px-4 py-2 text-white hover:opacity-50">
              <Image
                src="/assets/images/icon-back-button.svg"
                alt="previous icon"
                width={20}
                height={20}
              />
            </button>
          </Link>
        )}

        {/* Next Button (disabled if it's the last painting) */}
        {nextPainting ? (
          <Link href={`/gallery/${nextPainting.id}`}>
            <button className="px-4 py-2 text-white hover:opacity-50">
              <Image
                src="/assets/images/icon-next-button.svg"
                alt="next icon"
                width={20}
                height={20}
              />
            </button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-400 text-white" disabled>
            <Image
              src="/assets/images/icon-next-button.svg"
              alt="next icon"
              width={20}
              height={20}
            />
          </button>
        )}
      </nav>
    </footer>
  );
};

export default ArtworkNavigation;
