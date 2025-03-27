import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import useSession from '../hooks/useSession';
import { UserAuth } from "../components/context/AuthContext";
import { useState, useEffect } from 'react';

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
  
  const roomID = getUrlParams().get('roomID') || randomID(5);

  useEffect(() => {
    console.log(userData)
  },[userData])

  let myMeeting = async (element) => {
    const appID = Number(import.meta.env.VITE_APP_ID);
    const serverSecret = import.meta.env.VITE_Server_Secret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomID, 
      randomID(5),  
      userData.fullName
    );

    // Buat instance Zego
    const zp = ZegoUIKitPrebuilt.create(kitToken);

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

    // 🔥 Simulasi klik tombol "Join" setelah 2 detik
    setTimeout(() => {
      const joinButton = document.querySelector('.VsTVUAD89KWleD0YRVsD'); 
      if (joinButton) {
        joinButton.click();
      }
    }, 100);
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
