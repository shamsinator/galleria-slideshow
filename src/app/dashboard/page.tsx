import React from "react";
import Image from "next/image";
import {
  LayoutContainer,
  MainContentContainer,
} from "@/_components/LayoutContainer";
import MainHeader from "@/_components/Header/MainHeader";
import { UserIcon } from "@/_components/Icons";
import { serverGalleryService } from "@/_services/gallery/server";
import { VisibilityToggle } from "@/_components/VisibilityToggle";
import { DeleteButton } from "@/_components/DeleteButton";
import { AddArtworkModal } from "@/_components/AddArtworkModal";

const Dashboard = async () => {
  const artwork = await serverGalleryService.getAllPaintings({
    includeInactive: true,
  });

  if (artwork) {
    return (
      <LayoutContainer>
        <MainHeader showSlideshowButton={false} />
        <MainContentContainer>
          <pre>Coming soon...</pre>

          {/* Dashboard component */}
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            {/* Add Artwork Modal */}
            <AddArtworkModal />

            {/* Table with current artworks */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Year</th>
                    <th>Images</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artwork.map((artwork) => (
                    <tr key={artwork.id}>
                      {/* Title */}
                      <td className="font-medium">{artwork.name}</td>

                      {/* Artist */}
                      <td>
                        <div className="flex items-center gap-2">
                          {artwork.artist?.image && (
                            <Image
                              src={artwork.artist.image}
                              alt={artwork.artist.name}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium">
                              {artwork.artist?.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Year */}
                      <td>{artwork.year}</td>

                      {/* Images */}
                      <td>
                        <div className="flex gap-2">
                          {/* Thumbnail */}
                          {artwork.images?.thumbnail && (
                            <div className="relative group">
                              <Image
                                src={artwork.images.thumbnail}
                                alt={`${artwork.name} thumbnail`}
                                width={48}
                                height={48}
                                className="object-cover rounded-md"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                <span className="text-white text-xs">
                                  Thumb
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Gallery Image */}
                          {artwork.images?.gallery && (
                            <div className="relative group">
                              <Image
                                src={artwork.images.gallery}
                                alt={`${artwork.name} gallery`}
                                width={48}
                                height={48}
                                className="object-cover rounded-md"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                <span className="text-white text-xs">
                                  Gallery
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Hero Images */}
                          {artwork.images?.hero?.small && (
                            <div className="relative group">
                              <Image
                                src={artwork.images.hero.small}
                                alt={`${artwork.name} hero`}
                                width={48}
                                height={48}
                                className="object-cover rounded-md"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                <span className="text-white text-xs">Hero</span>
                              </div>
                            </div>
                          )}

                          {/* Show count if no images */}
                          {!artwork.images?.thumbnail &&
                            !artwork.images?.gallery &&
                            !artwork.images?.hero?.small && (
                              <span className="text-gray-400 text-sm">
                                No images
                              </span>
                            )}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <VisibilityToggle
                          id={artwork.id}
                          initialIsActive={artwork.is_active}
                        />
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-warning">Edit</button>
                          <DeleteButton
                            id={artwork.id}
                            artworkName={artwork.name}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {artwork.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <UserIcon className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No artwork found
                    </h3>
                    <p className="text-sm">
                      Get started by adding your first artwork to the gallery.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </MainContentContainer>
      </LayoutContainer>
    );
  }

  // Loading or error state
  return (
    <LayoutContainer>
      <MainHeader showSlideshowButton={false} />
      <MainContentContainer>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
          <div className="text-center py-12">
            <p className="text-gray-500">Loading artwork...</p>
          </div>
        </div>
      </MainContentContainer>
    </LayoutContainer>
  );
};

export default Dashboard;
