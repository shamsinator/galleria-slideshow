"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Artwork } from "../../types";

interface SlideFooterProps {
  paintings: Array<Artwork>;
  currentIndex: number;
}

const ArtworkNavigation = ({ paintings, currentIndex }: SlideFooterProps) => {
  const isLastArtwork = currentIndex === paintings.length - 1;
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const router = useRouter();

  useEffect(() => {
    setProgress(0);

    // @ts-ignore
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 1;
        if (nextProgress >= 100) {
          // @ts-ignore
          clearInterval(intervalRef.current!);
          if (!isLastArtwork) {
            router.push(`/gallery/${paintings[currentIndex + 1].id}`);
          }
          return prev; // Keep progress full after navigation
        }
        return nextProgress;
      });
    }, 60);

    return () => {
      if (intervalRef.current) {
        // @ts-ignore
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isLastArtwork, paintings, router]);

  // Memoize these values so they are only recalculated when currentIndex or paintings changes. This reduces unnecessary recomputations on re-renders.
  const prevPainting = useMemo(
    () => (currentIndex > 0 ? paintings[currentIndex - 1] : null),
    [currentIndex, paintings]
  );

  const nextPainting = useMemo(
    () =>
      currentIndex < paintings.length - 1 ? paintings[currentIndex + 1] : null,
    [currentIndex, paintings]
  );

  return (
    <footer className="flex z-50 flex-col justify-between items-center w-full fixed bottom-0 left-0 px-2 lg:px-10 py-3 bg-white 2xl:px-12">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 mb-4">
        <div
          className={`h-full ${
            isLastArtwork ? "bg-black" : "bg-gray-500"
          } progress-bar`}
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
          <Link
            href={`/gallery/${prevPainting.id}`}
            aria-label="Go to previous artwork"
          >
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
          <Link
            href={`/gallery/${nextPainting.id}`}
            aria-label="Go to next artwork"
          >
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
          <button
            className="px-4 py-2 bg-gray-400 text-white"
            disabled
            aria-disabled="true"
          >
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
