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
        if (incomingCall) {
            await supabase.from("video_calls").update({ status: "accepted" }).eq("id", incomingCall.id);
            navigate(`/careyou/?roomID=${incomingCall.room_id}`);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    };

    const denyCall = async () => {
        if (incomingCall) {
            await supabase.from("video_calls").update({ status: "rejected" }).eq("id", incomingCall.id);
            setIncomingCall(null);
        }
    }

    useEffect(() => {
        if(incomingCall != null){
            const utterance = new SpeechSynthesisUtterance("Halo Mate, "+incomingCall.from + " mengundang video call. tekan 1 kali pada layar bebas untuk bergabung, tahan pada layar bebas selama 2 detik untuk menolak panggilan.");
            utterance.lang = "id-ID";
            window.speechSynthesis.speak(utterance);
        }
    }, [incomingCall])

    
    const handleClick = () => {
        acceptCall();
    };

    const handleHoldStart = () => {
        holdTimer = setTimeout(() => {
            denyCall();
        }, 2000);
    };

    const handleHoldEnd = () => {
        clearTimeout(holdTimer);
    };

    useEffect(() => {
        if (incomingCall) {
            const audio = new Audio("/assets/audio/notification.mp3");
            audio.play();
        }
    }, [incomingCall]);

    return incomingCall ? (
        <div className="w-screen h-screen z-50 absolute top-0 left-0 ">
            <div className="w-full h-full" 
            onClick={handleClick} 
            onMouseDown={handleHoldStart} 
            onMouseUp={handleHoldEnd} 
            onTouchStart={handleHoldStart} 
            onTouchEnd={handleHoldEnd} 
            >
            </div>
            <div className="fixed z-50 shadow-lg transition duration-200 top-0 left-0 flex gap-2 items-center justify-center w-full bg-background text-dark p-4 md:flex-col md:mr-5 md:mt-5 md:right-0 md:left-auto md:w-[200px] md:h-[200px] md:rounded-xl">
                <p className="font-medium text-center text-non-active"> {incomingCall.from} mengundang video call </p>
                <button onClick={acceptCall} className="bg-green-500 text-white px-4 py-2 rounded md:w-full">Terima</button>
                <button onClick={denyCall} className="bg-red-500 px-4 text-white py-2 rounded md:w-full">Tolak</button>
            </div>
        </div>
    ) : (
        <div className="w-screen h-screen absolute top-0  left-0 ">
            <div className="w-full h-full " 
            onClick={handleClick} 
            onMouseDown={handleHoldStart} 
            onMouseUp={handleHoldEnd} 
            onTouchStart={handleHoldStart} 
            onTouchEnd={handleHoldEnd}
            >
            </div>
            <div className="fixed z-50 transition duration-200 top-0 -translate-y-[100px] md:translate-y-0 md:translate-x-[220px] left-0 flex gap-2 items-center justify-center w-full bg-background text-dark p-4 md:flex-col md:mr-5 md:mt-5 md:right-0 md:left-auto md:w-[200px] md:h-[200px] md:rounded-xl">
                <p className="font-medium text-center"> mengundang video call </p>
                <button onClick={acceptCall} className="bg-green-500 px-4 py-2 rounded md:w-full">Terima</button>
                <button onClick={denyCall} className="bg-red-500 px-4 py-2 rounded md:w-full">Tolak</button>
            </div>
        </div>
    );
    
};

export default IncomingCall;
