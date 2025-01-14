import React from "react";

const NavbarMobile = () => {
  return (
    <nav className="w-full h-[15vh] md:hidden bg-white flex items-center gap-5 justify-between container px-10">
      <div>
      <svg class="w-12" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"></path>
      </svg>
      </div>
      <div>
      <svg class="w-12" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"></path>
      </svg>
      </div>
      <div>
      <svg class="w-12" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"></path>
      </svg>
      </div>
    </nav>
  );
};

export default NavbarMobile;
