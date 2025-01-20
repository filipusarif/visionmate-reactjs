import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarMobile = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: "/vi/barcode", icon: "/assets/images/menu/qr.svg", label: "QR CODE" },
    { path: "/vi", icon: "/assets/images/menu/map.svg", label: "MAP" },
    { path: "/vi/sos", icon: "/assets/images/menu/sos.svg", label: "SOS" },
    { path: "/vi/profile", icon: "/assets/images/menu/profil.svg", label: "PROFIL" },
  ];

  return (
    <nav className="w-full h-fit z-50 py-3 fixed bottom-0 lg:hidden shadow-xl shadow-dark bg-white ">
      <div className="flex items-center gap-2 justify-between container mx-auto">

      {menuItems.map((item, index) => (
        <Link key={index} to={item.path} className={` ${location.pathname === item.path  ? "w-2/5 bg-secondary h-[60px]" : "w-1/5 bg-blue-200 h-[60px]"} transition-all ease-in-out  rounded-full flex justify-center  items-center gap-2 py-5`}>
          {item.label === "QR CODE" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 9.75C1.59 9.75 1.25 9.41 1.25 9V6.5C1.25 3.6 3.61 1.25 6.5 1.25H9C9.41 1.25 9.75 1.59 9.75 2C9.75 2.41 9.41 2.75 9 2.75H6.5C4.43 2.75 2.75 4.43 2.75 6.5V9C2.75 9.41 2.41 9.75 2 9.75Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M22 9.75C21.59 9.75 21.25 9.41 21.25 9V6.5C21.25 4.43 19.57 2.75 17.5 2.75H15C14.59 2.75 14.25 2.41 14.25 2C14.25 1.59 14.59 1.25 15 1.25H17.5C20.39 1.25 22.75 3.6 22.75 6.5V9C22.75 9.41 22.41 9.75 22 9.75Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M17.5 22.75H16C15.59 22.75 15.25 22.41 15.25 22C15.25 21.59 15.59 21.25 16 21.25H17.5C19.57 21.25 21.25 19.57 21.25 17.5V16C21.25 15.59 21.59 15.25 22 15.25C22.41 15.25 22.75 15.59 22.75 16V17.5C22.75 20.4 20.39 22.75 17.5 22.75Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M9 22.75H6.5C3.61 22.75 1.25 20.4 1.25 17.5V15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15V17.5C2.75 19.57 4.43 21.25 6.5 21.25H9C9.41 21.25 9.75 21.59 9.75 22C9.75 22.41 9.41 22.75 9 22.75Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M9 11.25H7C5.59 11.25 4.75 10.41 4.75 9V7C4.75 5.59 5.59 4.75 7 4.75H9C10.41 4.75 11.25 5.59 11.25 7V9C11.25 10.41 10.41 11.25 9 11.25ZM7 6.25C6.41 6.25 6.25 6.41 6.25 7V9C6.25 9.59 6.41 9.75 7 9.75H9C9.59 9.75 9.75 9.59 9.75 9V7C9.75 6.41 9.59 6.25 9 6.25H7Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M17 11.25H15C13.59 11.25 12.75 10.41 12.75 9V7C12.75 5.59 13.59 4.75 15 4.75H17C18.41 4.75 19.25 5.59 19.25 7V9C19.25 10.41 18.41 11.25 17 11.25ZM15 6.25C14.41 6.25 14.25 6.41 14.25 7V9C14.25 9.59 14.41 9.75 15 9.75H17C17.59 9.75 17.75 9.59 17.75 9V7C17.75 6.41 17.59 6.25 17 6.25H15Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M9 19.25H7C5.59 19.25 4.75 18.41 4.75 17V15C4.75 13.59 5.59 12.75 7 12.75H9C10.41 12.75 11.25 13.59 11.25 15V17C11.25 18.41 10.41 19.25 9 19.25ZM7 14.25C6.41 14.25 6.25 14.41 6.25 15V17C6.25 17.59 6.41 17.75 7 17.75H9C9.59 17.75 9.75 17.59 9.75 17V15C9.75 14.41 9.59 14.25 9 14.25H7Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M17 19.25H15C13.59 19.25 12.75 18.41 12.75 17V15C12.75 13.59 13.59 12.75 15 12.75H17C18.41 12.75 19.25 13.59 19.25 15V17C19.25 18.41 18.41 19.25 17 19.25ZM15 14.25C14.41 14.25 14.25 14.41 14.25 15V17C14.25 17.59 14.41 17.75 15 17.75H17C17.59 17.75 17.75 17.59 17.75 17V15C17.75 14.41 17.59 14.25 17 14.25H15Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
          </svg>
          )}
          {item.label === "MAP" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1_15830)">
          <path d="M7.63004 3.57005C7.80942 3.47221 8.00004 3.62274 8.00004 3.82707V17.3829C8.00004 17.6061 7.84762 17.7949 7.65024 17.8992C7.64347 17.9028 7.63673 17.9064 7.63004 17.9101L5.28004 19.2501C3.64004 20.1901 2.29004 19.4101 2.29004 17.5101V7.78005C2.29004 7.15005 2.74004 6.37005 3.30004 6.05005L7.63004 3.57005Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
          <path d="M14.7219 6.10229C14.8922 6.18664 15 6.36028 15 6.55035V19.7035C15 20.072 14.615 20.3139 14.283 20.1539L10.033 18.1063C9.85998 18.023 9.75 17.8479 9.75 17.6559V4.44559C9.75 4.07473 10.1396 3.83294 10.4719 3.99753L14.7219 6.10229Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
          <path d="M22 6.48994V16.2199C22 16.8499 21.55 17.6299 20.99 17.9499L17.4986 19.9509C17.1653 20.1419 16.75 19.9013 16.75 19.5171V6.33026C16.75 6.15075 16.8462 5.98501 17.0021 5.89602L19.01 4.74994C20.65 3.80994 22 4.58994 22 6.48994Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
          </g>
          <defs>
          <clipPath id="clip0_1_15830">
          <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          )}
          {item.label === "SOS" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.62 10.75C17.19 10.75 16.85 10.4 16.85 9.97998C16.85 9.60998 16.48 8.83998 15.86 8.16998C15.25 7.51998 14.58 7.13998 14.02 7.13998C13.59 7.13998 13.25 6.78998 13.25 6.36998C13.25 5.94998 13.6 5.59998 14.02 5.59998C15.02 5.59998 16.07 6.13998 16.99 7.10998C17.85 8.01998 18.4 9.14998 18.4 9.96998C18.4 10.4 18.05 10.75 17.62 10.75Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M21.23 10.75C20.8 10.75 20.46 10.4 20.46 9.98C20.46 6.43 17.57 3.55 14.03 3.55C13.6 3.55 13.26 3.2 13.26 2.78C13.26 2.36 13.6 2 14.02 2C18.42 2 22 5.58 22 9.98C22 10.4 21.65 10.75 21.23 10.75Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
            <path d="M21.9701 18.33C21.9701 18.61 21.9201 18.9 21.8201 19.18C21.7901 19.26 21.7601 19.34 21.7201 19.42C21.5501 19.78 21.3301 20.12 21.0401 20.44C20.5501 20.98 20.0101 21.37 19.4001 21.62C19.3901 21.62 19.3801 21.63 19.3701 21.63C18.7801 21.87 18.1401 22 17.4501 22C16.4301 22 15.3401 21.76 14.1901 21.27C13.0401 20.78 11.8901 20.12 10.7501 19.29C10.3601 19 9.9701 18.71 9.6001 18.4L12.8701 15.13C13.1501 15.34 13.4001 15.5 13.6101 15.61C13.6601 15.63 13.7201 15.66 13.7901 15.69C13.8701 15.72 13.9501 15.73 14.0401 15.73C14.2101 15.73 14.3401 15.67 14.4501 15.56L15.2101 14.81C15.4601 14.56 15.7001 14.37 15.9301 14.25C16.1601 14.11 16.3901 14.04 16.6401 14.04C16.8301 14.04 17.0301 14.08 17.2501 14.17C17.4701 14.26 17.7001 14.39 17.9501 14.56L21.2601 16.91C21.5201 17.09 21.7001 17.3 21.8101 17.55C21.9101 17.8 21.9701 18.05 21.9701 18.33Z" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
          </svg>          
          )}
          {item.label === "PROFIL" && (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.341461" y="0.341461" width="24" height="24" rx="12" fill={location.pathname === item.path  ? "#fff" : "#196EF3"}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8.59146 9.34146C8.59146 7.27039 10.2704 5.59146 12.3415 5.59146C14.4125 5.59146 16.0915 7.27039 16.0915 9.34146C16.0915 11.4125 14.4125 13.0915 12.3415 13.0915C10.2704 13.0915 8.59146 11.4125 8.59146 9.34146Z" fill={location.pathname === item.path  ? "#196EF3" : "#fff"}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M5.4675 21.0959C5.53195 17.3544 8.58478 14.3415 12.3415 14.3415C16.0982 14.3415 19.1511 17.3546 19.2154 21.0962C19.2197 21.3443 19.0767 21.5715 18.8512 21.675C16.8687 22.5846 14.6636 23.0915 12.3417 23.0915C10.0197 23.0915 7.81432 22.5845 5.83173 21.6747C5.60617 21.5712 5.46323 21.344 5.4675 21.0959Z" fill={location.pathname === item.path  ? "#196EF3" : "#fff"}/>
          </svg>
          )}
          <h1 className={`font-bold text-white text-md ${location.pathname === item.path  ? "block" : "hidden"}`}>{item.label}</h1>
      </Link>
      ))}
      </div>
      {/* <Link to="/vi" className="bg-primary  rounded-full flex justify-center px-4 py-4 items-center gap-2">
          <img src="/assets/images/menu/qr.svg" alt="" />
          <h1 className={`font-bold text-white text-md ${location.pathname === "/vi"  ? "block" : "hidden"}`}>QR CODE</h1>
      </Link>
      <Link to="/vi/sos" className="bg-primary  rounded-full flex justify-center px-4 py-4 items-center gap-2">
          <img src="/assets/images/menu/qr.svg" alt="" />
          <h1 className={`font-bold text-white text-md ${location.pathname === "/vi/sos"  ? "block" : "hidden"}`}>QR CODE</h1>
      </Link>
      <Link to="/vi/profile" className="bg-primary  rounded-full flex justify-center px-4 py-4 items-center gap-2">
          <img src="/assets/images/menu/qr.svg" alt="" />
          <h1 className={`font-bold text-white text-md ${location.pathname === "/vi/profile"  ? "block" : "hidden"}`}>QR CODE</h1>
      </Link> */}
    </nav>
  );
};

export default NavbarMobile;
