import MainHeader from "@/_components/Header/MainHeader";
import ArtworkGallery from "@/_components/ArtworkGallery";
import {
  LayoutContainer,
  MainContentContainer,
} from "@/_components/LayoutContainer";

export default function Home() {
  return (
    <LayoutContainer>
      <MainHeader />
      <MainContentContainer>
        <ArtworkGallery />
      </MainContentContainer>
    </LayoutContainer>
  );
}
