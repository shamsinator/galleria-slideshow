"use client";

import { useState } from "react";
import { deleteArtwork } from "@/app/dashboard/actions";
import { TrashIcon } from "@/_components/Icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/_components/ui/alert-dialog";

/**
 * Interface for DeleteButton component props
 * @interface DeleteButtonProps
 * @property {string} id - Unique identifier for the artwork
 * @property {string} artworkName - Name of the artwork for confirmation purposes
 */
interface DeleteButtonProps {
  id: string;
  artworkName: string;
}

/**
 * DeleteButton Component
 *
 * A button component that handles artwork deletion with a shadcn modal confirmation.
 * Provides visual feedback during the deletion process and displays errors.
 *
 * @component
 * @param {DeleteButtonProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export function DeleteButton({ id, artworkName }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handles the actual deletion of artwork
   *
   * Makes an async call to the server to delete the artwork,
   * handles loading states and errors.
   *
   * @async
   * @function handleConfirmDelete
   * @returns {Promise<void>}
   */
  const handleConfirmDelete = async () => {
    if (!id) {
      setError("Missing artwork ID");
      return;
    }

    // Set loading state and clear any previous errors
    setIsLoading(true);
    setError(null);

    try {
      // Call the server action to delete the artwork
      await deleteArtwork(id);
      // Close the modal on successful deletion
      setIsOpen(false);
      // No need to update any local state since the page will be revalidated
    } catch (error) {
      console.error("Failed to delete artwork:", error);
      setError("Failed to delete artwork. Please try again.");
    } finally {
      // Reset loading state whether operation succeeded or failed
      setIsLoading(false);
    }
  };

  /**
   * Handles modal close and resets error state
   */
  const handleModalClose = () => {
    if (!isLoading) {
      setIsOpen(false);
      setError(null);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="btn btn-error" aria-label="Delete artwork">
          <TrashIcon /> Delete
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Artwork</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &ldquo;
            <strong>{artworkName}</strong>&rdquo;? This action cannot be undone
            and will permanently remove the artwork from your gallery.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <div className="text-red-700 text-sm" role="alert">
              {error}
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleModalClose} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-xs mr-2"></span>
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon />
                Delete Artwork
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
