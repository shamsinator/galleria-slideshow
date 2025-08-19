import {
  LayoutContainer,
  MainContentContainer,
} from "@/_components/common/layout/LayoutContainer";
import MainHeader from "@/_components/Header/MainHeader";
import ArtworkGallery from "@/_components/ArtworkGallery";
import Navbar from "@/_components/Navbar";
import { serverGalleryService } from "@/_services/gallery/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/_utils/queryClient";

export default async function Home() {
  // Pre-fetch data on the server for better performance
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["paintings", "active"],
    queryFn: () =>
      serverGalleryService.getAllPaintings({ includeInactive: false }),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContainer>
        <Navbar />
        <hr></hr>
        <MainHeader />
        <MainContentContainer>
          <ArtworkGallery />
        </MainContentContainer>
      </LayoutContainer>
    </HydrationBoundary>
  );
}
