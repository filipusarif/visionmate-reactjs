import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = import.meta.env.VITE_APP_ID; 
const CHANNEL_NAME = import.meta.env.VITE_CHANNEL_NAME;
const TEMP_TOKEN = import.meta.env.VITE_TEMP_TOKEN; 

const VideoCall = ({ userRole, userId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [rtcClient, setRtcClient] = useState(null);
    // console.log("🟢 VideoCall Component Rendered!");


    useEffect(() => {
        const checkCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                console.log("✅ Kamera & Mikrofon diizinkan!");
                stream.getTracks().forEach(track => track.stop());
            } catch (error) {
                console.error("❌ Kamera tidak bisa diakses:", error);
            }
        };
    
        checkCameraPermission();
    }, []);
    

    useEffect(() => {
        const initAgora = async () => {
            const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    const remoteTrack = user.videoTrack;
                    remoteTrack.play(remoteVideoRef.current);
                }
            });

            console.log("🔍 APP_ID:", APP_ID);
            console.log("🔍 CHANNEL_NAME:", CHANNEL_NAME);
            console.log("🔍 TEMP_TOKEN:", TEMP_TOKEN);

            console.log("🔵 Mencoba bergabung ke channel Agora...");

            await client.join(APP_ID, CHANNEL_NAME, TEMP_TOKEN, userId);

            console.log("✅ Berhasil bergabung ke channel:", CHANNEL_NAME);

            console.log("User joined Agora channel:", CHANNEL_NAME);

            const localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
            console.log("Camera & mic tracks created");

            localTracks[1].play(localVideoRef.current);
            console.log("Local video started");

            
            await client.publish(localTracks);

            setRtcClient(client);
        };

        initAgora();

        return () => {
            rtcClient?.leave();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2>Agora Video Call</h2>
            <div className="flex">
                <video ref={localVideoRef} autoPlay playsInline className="w-1/2 h-auto border-2 border-white" />
                <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 h-auto border-2 border-white ml-4" />
            </div>
        </div>
    );
};

export default VideoCall;
