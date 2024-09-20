import MainHeader from "@/_components/MainHeader";
import { paintings } from "./data";
import ArtworkGallery from "@/_components/ArtworkGallery";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <header className="mx-auto flex flex-row items-center justify-between max-w-[1190px] min-h-[120px] h-[14.2vh] border-b border-gray-300 w-full">
        <MainHeader />
      </header>
      <main className="max-w-[1190px] mx-auto mt-10">
        <ArtworkGallery paintings={paintings} />
      </main>
    </Fragment>
  );
}
