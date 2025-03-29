import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarMobile = ({type = "vi"}) => {
  const location = useLocation();
  
  const menuItems = [
    { path: "/vi/barcode", icon: "/assets/images/mobile/barcode.svg", label: "QR CODE" },
    { path: "/vi/read", icon: "/assets/images/mobile/read.svg", label: "READTHAT" },
    { path: "/vi", icon: "/assets/images/mobile/vi.svg", label: "ASSISTANT" },
    { path: "/vi/sos", icon: "/assets/images/mobile/sos.svg", label: "SOS" },
    { path: "/vi/profile", icon: "/assets/images/mobile/profile.svg", label: "PROFIL" },
  ];
  const menuItemsGuard = [
    { path: "/guard/scan", icon: "/assets/images/mobile/scan.svg", label: "SCAN" },
    { path: "/guard", icon: "/assets/images/mobile/monitoring.svg", label: "MONITORING" },
    { path: "/guard/sos", icon: "/assets/images/mobile/sos.svg", label: "SOS" },
    { path: "/guard/profile", icon: "/assets/images/mobile/profile.svg", label: "PROFIL" },
  ];

  return (
    <nav className="w-full h-[60px] z-50 fixed bottom-0 lg:hidden shadow-2xl flex justify-center items-center shadow-dark bg-background ">
      <div className="flex items-center gap-2 justify-between container mx-auto">
      {type === "vi" && (
        <>
          {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className={` ${location.pathname === item.path  ? " bg-[#DEE8FC]" : " bg-background"} w-1/5 transition-all ease-in-out  rounded-xl flex justify-center  items-center gap-2 py-3 px-3 mx-1`}>
            <img src={item.icon} alt="" />
          </Link>
          ))}
        </>
      )}
      {type === "guard" && (
        <>
          {menuItemsGuard.map((item, index) => (
          <Link key={index} to={item.path} className={` ${location.pathname === item.path  ? " bg-[#DEE8FC]" : " bg-background"} w-1/5 transition-all ease-in-out  rounded-xl flex justify-center  items-center gap-2 py-3 px-3 mx-1`}>
            <img src={item.icon} alt="" />
          </Link>
          ))}
        </>
      )}
      
      </div>
    </nav>
  );
};

export default NavbarMobile;
