import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/images/logo.svg";
import StartSlideshowButton from "./StartSlideshowButton";

export const Header = () => {
  return (
    <div className="flex justify-between items-center w-full p-4 text-white">
      <Link
        className={`h-8 flex items-center cursor-pointer`}
        href="/"
        aria-label="home"
      >
        <Image src={Logo} alt="Logo" width={170} height={48} priority />
      </Link>
      <StartSlideshowButton />
    </div>
  );
};

export default Header;
