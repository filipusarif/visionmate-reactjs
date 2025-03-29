import { useState } from "react";
import { supabase } from "../../../services/lib/supabaseClient";

const Chat = ({ messages, userInfo, vi_id, guard_email, onNewMessage, startCall, setPage }) => {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim() || !vi_id || !guard_email) return;
        
        setIsSending(true);
        
        try {
            const newMessage = {
                vi_id: vi_id,
                chat: message,
                guard_email: guard_email,
                created_at: new Date().toISOString()
            };

            // Insert message to respons table
            const { data, error } = await supabase
                .from("respons")
                .insert([newMessage])
                .select();

            if (error) throw error;

            // Update UI immediately
            onNewMessage({
                ...newMessage,
                sender: "self" // Tandai sebagai pesan dari guard
            });

            setMessage("");
            
        } catch (error) {
            console.error("Error sending message:", error.message);
            // Anda bisa tambahkan notifikasi error di sini jika perlu
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    if (!userInfo) {
        return (
            <div className="flex items-center justify-center flex-col gap-5 h-full w-full bg-gray-100 rounded-xl border-[1px] border-gray-400">
                <img src="/assets/images/sidebar/sos-guard.svg" className="w-12" alt="" />
                <p className="font-medium text-non-active">
                    Mulai Percakapan dengan VI
                </p>
            </div>
        );
    }



    return (
        <div className="flex flex-col h-full w-full pb-12 lg:pb-0 bg-gray-100 rounded-xl border-[1px] border-gray-400 relative" style={{ backgroundImage: "url('/assets/images/texture.svg')" }}>
            <div className="flex items-center justify-between py-2 px-4 bg-white rounded-t-xl shadow-md">
                <div className="flex items-center">
                    <img src="/assets/images/menu/back.svg" className="mr-3 block lg:hidden" onClick={()=>setPage(false)} alt="" />
                    <img 
                        src={userInfo.photo || "https://placehold.co/20"} 
                        alt="User" 
                        className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{userInfo.fullName}</h2>
                        {userInfo.active ? (
                            <p className="text-xs text-green-500">Walking</p>
                        ) : (
                            <p className="text-xs text-red-500">Unactive</p>
                        )}
                    </div>
                </div>

                {vi_id && (
                    <button
                        onClick={() => startCall(vi_id)}
                        className="py-2 px-3 border border-gray-300 rounded-lg text-gray-600  hover:bg-gray-200 transition-all duration-200"
                    >
                        <img 
                            src="/assets/images/vidCall/Vidcall.svg" 
                            alt="Call Icon" 
                            className="w-5 h-5" 
                        />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length > 0 ? messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "self" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex flex-col gap-1 ${msg.sender === "self" ? "items-end" : "items-start"} `}>
                            <div className={`py-2 px-3 max-w-xs rounded-lg text-white text-sm 
                                ${msg.sender === "self" ? "bg-[#1E4FBC] text-white rounded-br-none" : "bg-[#0D2352] text-white rounded-bl-none"}`}>
                                {msg.chat}
                            </div>
                            <p className="text-[12px] text-non-active">
                                {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-500 text-center">Belum ada percakapan</p>
                )}
            </div>

            <div className="flex items-center p-3 border-t bg-white rounded-b-xl">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg focus:outline-none"
                    placeholder="Tulis pesan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSending}
                />
                <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-300"
                    onClick={handleSendMessage}
                    disabled={isSending || !message.trim()}
                >
                    <img 
                        src="/assets/images/sos/Send.svg" 
                        alt="Send Icon" 
                        className="w-6 h-6" 
                    />
                </button>
            </div>
        </div>
    );
};

export default Chat;