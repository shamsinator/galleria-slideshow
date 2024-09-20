import MainHeader from "@/_components/MainHeader";
import { paintings } from "./data";
import ArtworkGallery from "@/_components/ArtworkGallery";

export default function Home() {
  return (
    <div className="py-4 px-4 md:px-5 2xl:px-12">
      <header className="mx-auto flex flex-row items-center justify-between max-w-[1190px] min-h-[120px] h-[14.2vh] border-b border-gray-300 w-full">
        <MainHeader />
      </header>
      <main className="max-w-[1190px] mx-auto mt-10">
        <ArtworkGallery paintings={paintings} />
      </main>
    </div>
  );
}
