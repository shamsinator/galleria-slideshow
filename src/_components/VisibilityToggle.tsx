"use client";

import { EyeIcon } from "@/_components/Icons";
import { useState } from "react";
import { toggleArtworkVisibility } from "@/app/dashboard/actions";

/**
 * Interface for VisibilityToggle component props
 * @interface VisibilityToggleProps
 * @property {string} id - Unique identifier for the artwork
 * @property {boolean} initialIsActive - Initial visibility state of the artwork
 */
interface VisibilityToggleProps {
  id: string;
  initialIsActive: boolean;
}

/**
 * VisibilityToggle Component
 *
 * A button component that toggles the visibility state of an artwork.
 * Provides visual feedback during state changes and displays errors when they occur.
 *
 * @component
 * @param {VisibilityToggleProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export function VisibilityToggle({
  id,
  initialIsActive,
}: VisibilityToggleProps) {
  // State variables to manage visibility, loading state, and error messages
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the visibility toggle action
   *
   * Makes an async call to the server to toggle artwork visibility,
   * updates local state, and handles any errors that occur.
   *
   * @async
   * @function handleToggle
   * @returns {Promise<void>}
   */
  const handleToggle = async (): Promise<void> => {
    if (!id) {
      setError("Missing artwork ID");
      return;
    }

    // Set loading state and clear any previous errors
    setIsLoading(true);
    setError(null);

    try {
      // Call the server action to toggle visibility
      await toggleArtworkVisibility(id);

      // Update local state using functional update to avoid race conditions
      setIsActive((prevState) => !prevState);
    } catch (error) {
      console.error("Failed to toggle visibility:", error);
      setError("Failed to update artwork visibility");
    } finally {
      // Always reset loading state whether operation succeeded or failed
      setIsLoading(false);
    }
  };

  const buttonLabel = isActive ? "Pause Artwork" : "Unpause Artwork";
  const buttonClasses = `
    btn btn-sm 
    ${
      isActive
        ? "bg-green-500 hover:bg-green-600"
        : "bg-gray-400 hover:bg-gray-500"
    } 
    text-white
    ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
  `.trim();

  return (
    <div className="tooltip" data-tip={buttonLabel}>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={buttonClasses}
        aria-label={buttonLabel}
      >
        {/* Icon representing visibility state */}
        <EyeIcon />

        {/* Show loading spinner during async operations */}
        {isLoading && (
          <span className="loading loading-spinner loading-xs ml-1"></span>
        )}
      </button>

      {/* Display error message if one exists */}
      {error && (
        <div className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
