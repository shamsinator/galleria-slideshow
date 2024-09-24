import React from "react";
import Link from "next/link";
import MainHeader from "@/_components/Header/MainHeader";
import Divider from "@/_components/Header/Divider";

export default function NotFoundPage() {
  return (
    <>
      <MainHeader showSlideshowButton={false} />
      <div className="flex flex-col items-center justify-center mt-20 py-4 px-4">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="mb-4 text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      </div>
      <Divider />
    </>
  );
}
