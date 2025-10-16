import React from "react";
import dynamic from "next/dynamic";
import {
  LayoutContainer,
  MainContentContainer,
} from "@/_components/common/layout/LayoutContainer";
import MainHeader from "@/_components/Header/MainHeader";
import { serverGalleryService } from "@/_services/gallery/server";
import { ArtworkTable } from "@/app/dashboard/components/ArtworkTable";
import { LoadingState } from "./components/LoadingState";

const Dashboard = async () => {
  const AddArtworkModal = dynamic(
    () => import("@/_components/AddArtworkModal"),
  );

  let artwork;
  try {
    artwork = await serverGalleryService.getAllPaintings({
      includeInactive: true,
    });
  } catch (error) {
    console.error("Failed to fetch artwork:", error);
  }

  return (
    <LayoutContainer>
      <MainHeader showSlideshowButton={false} />
      <MainContentContainer>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
          <AddArtworkModal />

          {artwork ? <ArtworkTable artworks={artwork} /> : <LoadingState />}
        </div>
      </MainContentContainer>
    </LayoutContainer>
  );
};

export default Dashboard;
