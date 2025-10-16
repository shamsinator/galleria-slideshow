import React from "react";
import { VisibilityToggle } from "@components/VisibilityToggle";
import { DeleteButton } from "@components/DeleteButton";
import { ArtworkThumbnails } from "./ArtworkThumbnails";
import { ArtistCell } from "./ArtistCell";
import { EmptyState } from "./EmptyState";
import { Artwork } from "@/../types";

interface ArtworkTableProps {
  artworks: Artwork[];
}

export const ArtworkTable: React.FC<ArtworkTableProps> = ({ artworks }) => {
  if (!artworks || artworks.length === 0) {
    return <EmptyState />;
  }

  return (
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
          {artworks.map((item) => (
            <tr key={item.id}>
              <td className="font-medium">{item.name}</td>
              <td>
                <ArtistCell artist={item.artist} />
              </td>
              <td>{item.year}</td>
              <td>
                <ArtworkThumbnails images={item.images} name={item.name} />
              </td>
              <td>
                <VisibilityToggle
                  id={item.id}
                  initialIsActive={item.is_active}
                />
              </td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-warning">Edit</button>
                  <DeleteButton id={item.id} artworkName={item.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
