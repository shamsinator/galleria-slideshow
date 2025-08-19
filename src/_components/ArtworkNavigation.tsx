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
  }, [currentIndex, paintings]);

  // We separate the navigation logic (router.push) from the state update (setProgress).
  // React issues a warning if we try to update the router during a state update cycle
  // (like inside setState or setProgress). This is because React doesn't allow state
  // updates from within the same render cycle that triggers them.
  // By moving router.push into a useEffect that listens for changes in 'progress',
  // we avoid this issue and ensure navigation happens only when the progress reaches 100.
  useEffect(() => {
    if (progress >= 100 && !isLastArtwork) {
      // Perform navigation only after progress completes and it's not the last artwork.
      router.push(`/gallery/${paintings[currentIndex + 1].slug}`);
    }
  }, [progress, isLastArtwork, paintings, currentIndex, router]);

  // if next or prev button used and if url contains "modal=true" remove it from the URL
  useEffect(() => {
    if (currentIndex > 0) {
      const url = new URL(window.location.href);
      if (url.searchParams.get("modal") === "true") {
        url.searchParams.delete("modal");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, [currentIndex]);

  // Memoize these values so they are only recalculated when currentIndex or paintings changes. This reduces unnecessary recomputations on re-renders.
  const prevPainting = useMemo(
    () => (currentIndex > 0 ? paintings[currentIndex - 1] : null),
    [currentIndex, paintings],
  );

  const nextPainting = useMemo(
    () =>
      currentIndex < paintings.length - 1 ? paintings[currentIndex + 1] : null,
    [currentIndex, paintings],
  );

  return (
    <footer className="flex flex-col items-center w-full fixed bottom-0 left-0 py-3 bg-white z-10">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-0.5 mb-4">
        <div
          className={`h-full ${
            isLastArtwork ? "bg-black" : "bg-gray-500"
          } progress-bar`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* Wrapper to match the content width */}
      <div className="flex flex-col w-full max-w-[1280px] justify-between items-center">
        {/* Content Wrapper */}
        <div className="flex justify-between items-center w-full">
          {/* Artwork Info aligned to the far left */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold">
              {paintings[currentIndex]?.name || "Unknown Name"}
            </h3>
            <small className="text-sm">
              {paintings[currentIndex]?.artist?.name || "Unknown Artist"}
            </small>
          </div>

          {/* Navigation Buttons aligned to the far right */}
          <nav className="flex items-center gap-2">
            {/* Previous Button */}
            {prevPainting && (
              <Link
                href={`/gallery/${prevPainting.slug}`}
                aria-label="Go to previous artwork"
              >
                <button className="flex items-center px-4 py-2 text-white hover:opacity-50">
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
                href={`/gallery/${nextPainting.slug}`}
                aria-label="Go to next artwork"
              >
                <button className="flex items-center px-4 py-2 text-white hover:opacity-50">
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
                className="flex items-center px-4 py-2 bg-gray-400 text-white"
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
        </div>
      </div>
    </footer>
  );
};

export default ArtworkNavigation;
