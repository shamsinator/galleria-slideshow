import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-300 p-4">
      <Link href="/create" className="btn btn-ghost">
        Add new painting
      </Link>
    </nav>
  );
};

export default Navbar;
