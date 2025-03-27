import { useState, useEffect } from "react";
import { supabase } from "../../../services/lib/supabaseClient";
import zgEngine from "../../../services/lib/zegocloud";
import { useNavigate } from "react-router-dom";


const IncomingCall = ({ viId }) => {
    const [incomingCall, setIncomingCall] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const channel = supabase
            .channel("video_calls")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "video_calls" }, (payload) => {
                if (payload.new.vi_id === viId && payload.new.status === "pending") {
                    setIncomingCall(payload.new);
                }
            })
            .subscribe();
    
        return () => {
            supabase.removeChannel(channel);
        };
    }, [viId]);
    

    const acceptCall = async () => {
        console.log(incomingCall)
        if (incomingCall) {
            await supabase.from("video_calls").update({ status: "accepted" }).eq("id", incomingCall.id);
            navigate(`/careyou/?roomID=${incomingCall.room_id}`);
        }
    };

    return incomingCall ? (
        <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full bg-red-500 text-white p-4">
            <p>📞 Incoming Call from Guard</p>
            <button onClick={acceptCall} className="bg-green-500 px-4 py-2 rounded">Accept</button>
        </div>
    ) : null;
};

export default IncomingCall;
