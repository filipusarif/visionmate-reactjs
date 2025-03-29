import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import useSession from '../hooks/useSession';
import { UserAuth } from "../components/context/AuthContext";
import { useState, useEffect,useRef } from 'react';
import LoadingPage from './LoadingPage';
import Sidebar from '../components/fragments/sidebar';
import { SidebarItem } from '../components/fragments/sidebar';
import { useLocation } from "react-router-dom";


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const { decryptSession } = UserAuth();
  const [userData, setUserData] = useState(null);
  useSession(decryptSession, setUserData);
  const zegoInstance = useRef(null); // Simpan instance Zego
  const location = useLocation();

  
  const roomID = getUrlParams().get('roomID') || randomID(5);

  useEffect(() => {
    console.log(userData)
  },[userData])

  let myMeeting = async (element) => {
    const appID = Number(import.meta.env.VITE_APP_ID);
    const serverSecret = import.meta.env.VITE_Server_Secret;
    if(userData){
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID, 
        serverSecret, 
        roomID, 
        randomID(5),  
        userData.fullName
      );

      // Buat instance Zego
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zegoInstance.current = zp;

      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol + '//' +
              window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: true,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        useCamera: true,
        useMicrophone: true,
        showRoomTimer: true,

        onLeaveRoom: () => {
          if(userData.role == "Guard"){
            window.location.href = "/guard/sos"; 
          } else {
            window.location.href = "/vi"; 
          }
        },
      });
      
      if(userData.role !== "Guard"){
        setTimeout(() => {
          const joinButton = document.querySelector('.VsTVUAD89KWleD0YRVsD'); 
          if (joinButton) {
            joinButton.click();
          }
        }, 100);
      }
      // Simulasi klik tombol "Join" setelah 2 detik
    }
  };

  const menuItemsGuard = [
    { path: "/guard/scan", icon: "/assets/images/mobile/scan.svg", label: "SCAN" },
    { path: "/guard", icon: "/assets/images/mobile/monitoring.svg", label: "MONITORING" },
    { path: "/guard/sos", icon: "/assets/images/mobile/sos.svg", label: "SOS" },
    { path: "/guard/profile", icon: "/assets/images/mobile/profile.svg", label: "PROFIL" },
  ];

  return (
    <>
    {userData ? (
    <div className='flex lg:flex-row bg-soft-background flex-col-reverse w-screen h-screen relative'>
      {userData.role === "Guard" && (
      <>
        <Sidebar session={userData} >
          <a href={"/guard"}><SidebarItem text={"Monitoring"} icon={"/assets/images/sidebar/monitoring.svg"}/></a>
          <a href={"/guard/sos"}><SidebarItem text={"SOS"} icon={"/assets/images/sidebar/sos-guard.svg"}/></a>
          <a href={"/guard/scan"}><SidebarItem text={"Scan"} icon={"/assets/images/sidebar/scan.svg"}/></a>
          <a href={"/guard/profile"}><SidebarItem text={"Profile"} icon={"/assets/images/sidebar/profile.svg"}/></a>
        </Sidebar>
        <nav className="w-full h-[60px] z-50 fixed bottom-0 lg:hidden shadow-2xl flex justify-center items-center shadow-dark bg-background ">
              <div className="flex items-center gap-2 justify-between container mx-auto">
                {menuItemsGuard.map((item, index) => (
                <a key={index} href={item.path} className={` ${location.pathname === item.path  ? " bg-[#DEE8FC]" : " bg-background"} w-1/5 transition-all ease-in-out  rounded-xl flex justify-center  items-center gap-2 py-3 px-3 mx-1`}>
                  <img src={item.icon} alt="" />
                </a>
                ))}
              </div>
            </nav>
      </>
      )}
      <div
      className="flex lg:p-5 lg:flex-row gap-5 flex-col w-full h-full relative overflow-hidden"
      >
        <div className="lg:p-5 bg-background rounded-2xl flex lg:items-center lg:flex-col gap-2 flex-col w-full h-full relative overflow-hidden">
            <p className="text-lg text-left mb-0 lg:block hidden font-bold text-non-active w-full lg:text-start">Monitoring</p>
            {/* <div className="lg:p-0 bg-background rounded-xl flex lg:flex-row flex-col-reverse w-full h-full relative overflow-hidden"> */}
            {userData && (
              <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
            />
          )}
          {/* </div> */}
        </div>
      </div>
    </div>):(
      <LoadingPage/>
    ) }
    </>
  );
}
