import React from "react";
import Image from "next/image";
import {
  LayoutContainer,
  MainContentContainer,
} from "@/_components/LayoutContainer";
import MainHeader from "@/_components/Header/MainHeader";
import { EyeIcon, PlusIcon } from "@/_components/Icons";
import { serverGalleryService } from "@/_services/gallery/server";

const Dashboard = async () => {
  const artwork = await serverGalleryService.getAllPaintings();

  return (
    <LayoutContainer>
      <MainHeader showSlideshowButton={false} />
      <MainContentContainer>
        <pre>Coming soon...</pre>

        {/* TODO: this should become a Dashboard component */}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
          {/* Todo: button should trigger a modal*/}
          <button className="btn btn-accent">
            <PlusIcon />
            Add Artwork
          </button>
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
                {artwork.map((artwork, index) => (
                  <tr key={index}>
                    <td>{artwork.name}</td>
                    <td>{artwork.artist.name}</td>
                    <td>{artwork.year}</td>
                    <td>
                      <div className="flex space-x-4">
                        {artwork.images.thumbnail && (
                          <Image
                            key={artwork.images.thumbnail}
                            src={artwork.images.thumbnail}
                            alt={artwork.name}
                            width={64}
                            height={64}
                            className="object-cover rounded-md"
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="text-[30px] inline-block align-middle leading-[10px] text-[color:#10c469]">
                        •
                      </span>{" "}
                      Active
                    </td>
                    <td>
                      <button className="btn btn-warning">Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-error">Delete</button>
                    </td>
                    <td>
                      <div className="tooltip" data-tip="View">
                        <button>
                          <EyeIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MainContentContainer>
    </LayoutContainer>
  );
};

export default Dashboard;
