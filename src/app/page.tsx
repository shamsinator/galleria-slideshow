import {
  LayoutContainer,
  MainContentContainer,
} from "@/_components/LayoutContainer";
import MainHeader from "@/_components/Header/MainHeader";
import ArtworkGallery from "@/_components/ArtworkGallery";
import Navbar from "@/_components/Navbar";

export default function Home() {
  return (
    <LayoutContainer>
      <Navbar />
      <hr></hr>
      <MainHeader />
      <MainContentContainer>
        <ArtworkGallery />
      </MainContentContainer>
    </LayoutContainer>
  );
}
