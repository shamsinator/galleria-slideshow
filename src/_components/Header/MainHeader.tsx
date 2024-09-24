import React from "react";
import Link from "next/link";
import Image from "next/image";
import SlideshowButton from "@/_components/Header/SlideshowButton";

interface HeaderProps {
  showSlideshowButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showSlideshowButton = true,
}) => {
  return (
    <header className="mx-auto flex flex-row items-center justify-between max-w-[1190px] min-h-[120px] h-[14.2vh] border-b border-gray-300 w-full">
      <div className="flex justify-between items-center w-full p-4 text-white">
        <Link
          className={`h-8 flex items-center cursor-pointer`}
          href="/"
          aria-label="home"
        >
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            width={170}
            height={48}
            priority
          />
        </Link>
        {showSlideshowButton && <SlideshowButton />}
      </div>
    </header>
  );
};

export default Header;
