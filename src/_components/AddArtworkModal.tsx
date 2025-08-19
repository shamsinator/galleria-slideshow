"use client";

import { useState } from "react";
import {
  createArtwork,
  CreateArtworkData,
  ArtistData,
  ArtworkImages,
} from "@/app/dashboard/actions";
import { PlusIcon, ImageIcon, LinkIcon, UserIcon } from "@/_components/Icons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";
import { Checkbox } from "@/_components/ui/checkbox";
import { Separator } from "@/_components/ui/separator";

/**
 * Interface for form errors
 */
interface FormErrors {
  name?: string;
  year?: string;
  artistName?: string;
  source?: string;
  artistImage?: string;
  heroLarge?: string;
  heroSmall?: string;
  gallery?: string;
  thumbnail?: string;
  general?: string;
}

/**
 * AddArtworkModal Component
 *
 * A comprehensive modal for adding new artwork matching the SQL schema.
 * Includes all fields: name, year, description, source, artist info, images, and status.
 *
 * @component
 * @returns {JSX.Element} - Rendered component
 */
export function AddArtworkModal() {
  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<CreateArtworkData>({
    name: "",
    year: new Date().getFullYear(),
    description: "",
    source: "",
    artist: {
      name: "",
      image: "",
    },
    images: {
      hero: {
        large: "",
        small: "",
      },
      gallery: "",
      thumbnail: "",
    },
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Validates form data
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Artwork title is required";
    }

    if (!formData.artist.name.trim()) {
      newErrors.artistName = "Artist name is required";
    }

    if (
      !formData.year ||
      formData.year < 1000 ||
      formData.year > new Date().getFullYear()
    ) {
      newErrors.year = "Please enter a valid year";
    }

    // URL validation helper
    const validateUrl = (
      url: string,
      fieldName: string,
      errorKey: keyof FormErrors,
    ) => {
      if (url && url.trim()) {
        try {
          new URL(url);
        } catch {
          newErrors[errorKey] = `${fieldName} must be a valid URL`;
        }
      }
    };

    validateUrl(formData.source || "", "Source URL", "source");
    validateUrl(formData.artist.image || "", "Artist image URL", "artistImage");
    validateUrl(
      formData.images.hero?.large || "",
      "Hero large image URL",
      "heroLarge",
    );
    validateUrl(
      formData.images.hero?.small || "",
      "Hero small image URL",
      "heroSmall",
    );
    validateUrl(formData.images.gallery || "", "Gallery image URL", "gallery");
    validateUrl(
      formData.images.thumbnail || "",
      "Thumbnail image URL",
      "thumbnail",
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await createArtwork(formData);

      if (result.success) {
        resetForm();
        setIsOpen(false);
      } else {
        setErrors({ general: result.error || "Failed to create artwork" });
      }
    } catch (error) {
      console.error("Error creating artwork:", error);
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets form to initial state
   */
  const resetForm = () => {
    setFormData({
      name: "",
      year: new Date().getFullYear(),
      description: "",
      source: "",
      artist: {
        name: "",
        image: "",
      },
      images: {
        hero: {
          large: "",
          small: "",
        },
        gallery: "",
        thumbnail: "",
      },
      isActive: true,
    });
  };

  /**
   * Handles input changes for nested objects
   */
  const handleNestedChange = (
    path: string[],
    value: string | number | boolean,
  ) => {
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;

      // Navigate to the nested property
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }

      // Set the value
      current[path[path.length - 1]] = value;
      return newData;
    });

    // Clear related error
    const errorKey = path.join("") as keyof FormErrors;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
    }
  };

  /**
   * Handles simple input changes
   */
  const handleInputChange = (
    field: keyof CreateArtworkData,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mb-6">
          <PlusIcon />
          Add Artwork
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Artwork</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new artwork to your gallery. Fill in the details below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="text-red-700 text-sm" role="alert">
                {errors.general}
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            {/* Artwork Title */}
            <div className="space-y-2">
              <Label htmlFor="name">Artwork Title *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter artwork title"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Year Created */}
            <div className="space-y-2">
              <Label htmlFor="year">Year Created *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) =>
                  handleInputChange("year", parseInt(e.target.value))
                }
                min="1000"
                max={new Date().getFullYear()}
                className={errors.year ? "border-red-500" : ""}
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter artwork description (supports basic formatting)"
                rows={4}
              />
            </div>

            {/* Source Link */}
            <div className="space-y-2">
              <Label htmlFor="source">Source Link</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="source"
                  type="url"
                  value={formData.source}
                  onChange={(e) => handleInputChange("source", e.target.value)}
                  placeholder="https://example.com/artwork-info"
                  className={`pl-10 ${errors.source ? "border-red-500" : ""}`}
                />
              </div>
              {errors.source && (
                <p className="text-red-500 text-sm">{errors.source}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Artist Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Artist Information
            </h3>

            {/* Artist Name */}
            <div className="space-y-2">
              <Label htmlFor="artistName">Artist Name *</Label>
              <Input
                id="artistName"
                value={formData.artist.name}
                onChange={(e) =>
                  handleNestedChange(["artist", "name"], e.target.value)
                }
                placeholder="Enter artist name"
                className={errors.artistName ? "border-red-500" : ""}
              />
              {errors.artistName && (
                <p className="text-red-500 text-sm">{errors.artistName}</p>
              )}
            </div>

            {/* Artist Image */}
            <div className="space-y-2">
              <Label htmlFor="artistImage">Artist Image</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="artistImage"
                  type="url"
                  value={formData.artist.image}
                  onChange={(e) =>
                    handleNestedChange(["artist", "image"], e.target.value)
                  }
                  placeholder="https://example.com/artist-photo.jpg"
                  className={`pl-10 ${errors.artistImage ? "border-red-500" : ""}`}
                />
              </div>
              {errors.artistImage && (
                <p className="text-red-500 text-sm">{errors.artistImage}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Artwork Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Artwork Images
            </h3>

            {/* Hero Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroLarge">Hero Image (Large)</Label>
                <Input
                  id="heroLarge"
                  type="url"
                  value={formData.images.hero?.large}
                  onChange={(e) =>
                    handleNestedChange(
                      ["images", "hero", "large"],
                      e.target.value,
                    )
                  }
                  placeholder="https://example.com/hero-large.jpg"
                  className={errors.heroLarge ? "border-red-500" : ""}
                />
                {errors.heroLarge && (
                  <p className="text-red-500 text-sm">{errors.heroLarge}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroSmall">Hero Image (Small)</Label>
                <Input
                  id="heroSmall"
                  type="url"
                  value={formData.images.hero?.small}
                  onChange={(e) =>
                    handleNestedChange(
                      ["images", "hero", "small"],
                      e.target.value,
                    )
                  }
                  placeholder="https://example.com/hero-small.jpg"
                  className={errors.heroSmall ? "border-red-500" : ""}
                />
                {errors.heroSmall && (
                  <p className="text-red-500 text-sm">{errors.heroSmall}</p>
                )}
              </div>
            </div>

            {/* Gallery and Thumbnail Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gallery">Gallery Image</Label>
                <Input
                  id="gallery"
                  type="url"
                  value={formData.images.gallery}
                  onChange={(e) =>
                    handleNestedChange(["images", "gallery"], e.target.value)
                  }
                  placeholder="https://example.com/gallery.jpg"
                  className={errors.gallery ? "border-red-500" : ""}
                />
                {errors.gallery && (
                  <p className="text-red-500 text-sm">{errors.gallery}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  value={formData.images.thumbnail}
                  onChange={(e) =>
                    handleNestedChange(["images", "thumbnail"], e.target.value)
                  }
                  placeholder="https://example.com/thumbnail.jpg"
                  className={errors.thumbnail ? "border-red-500" : ""}
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm">{errors.thumbnail}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Publication Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Publication Settings</h3>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  handleInputChange("isActive", checked as boolean)
                }
              />
              <Label htmlFor="isActive">
                Publish Artwork (make visible in gallery)
              </Label>
            </div>
          </div>

          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  Creating...
                </>
              ) : (
                <>
                  <PlusIcon />
                  Add Artwork
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
