import React from "react";

const NavbarMobile = () => {
  return (
    <div className="relative bg-white">
      {/* Floating Button */}
      <div className="absolute inset-x-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {/* Ikon tengah */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2v20m10-10H2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative flex justify-between items-center bg-white h-16 shadow-md">
        {/* Left Icon */}
        <div className="flex flex-col items-center mx-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.121a3 3 0 000-4.242l-4.242-4.242a3 3 0 014.242 0L12 15.657l6.879-6.878a3 3 0 114.242 4.242l-6.879 6.879a3 3 0 01-4.242 0L5.121 17.12z"
            />
          </svg>
          <p className="text-xs">Profile</p>
        </div>

        {/* Curve */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white z-0">
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-full h-16"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,234.7C672,224,768,160,864,154.7C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Right Icon */}
        <div className="flex flex-col items-center mx-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-3.866 0-7 1.343-7 3s3.134 3 7 3 7-1.343 7-3-3.134-3-7-3zm0 0c0 1.657 3.134 3 7 3s7-1.343 7-3-3.134-3-7-3zm0 0c0-1.657-3.134-3-7-3s-7 1.343-7 3 3.134 3 7 3z"
            />
          </svg>
          <p className="text-xs">SOS</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
