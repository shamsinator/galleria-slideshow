import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to detect if the viewport width matches a specified maximum width.
 *
 * @param {number} width - The maximum width (in pixels) to match against the viewport width.
 *
 * @returns {boolean} - Returns `true` if the viewport width is less than or equal to the specified width, otherwise `false`.
 *
 * @example
 * const isSmallScreen = useMediaQuery(768);
 *
 * if (isSmallScreen) {
 *   // Render mobile layout
 * } else {
 *   // Render desktop layout
 * }
 */
export function useMediaQuery(width: number): boolean {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    setTargetReached(e.matches);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [width, updateTarget]);

  return targetReached;
}
