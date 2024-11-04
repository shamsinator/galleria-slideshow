import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-300 p-4">
      <Link href="/dashboard" className="btn btn-ghost">
        Manage Artworks
      </Link>
    </nav>
  );
};

export default Navbar;
