import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const appID = import.meta.env.VITE_APP_ID; // Ganti dengan App ID dari ZEGOCLOUD
const serverSecret = import.meta.env.VITE_Server_Secret; // Ganti dengan Server Secret dari ZEGOCLOUD

const zgEngine = new ZegoExpressEngine(appID, serverSecret);

export default zgEngine;
