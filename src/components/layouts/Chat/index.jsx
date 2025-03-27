import { useState } from "react";

const Chat = ({ messages }) => {

    return (
        <div className="flex flex-col h-full w-full bg-gray-100 rounded-xl border-[1px] border-gray-400 relative" style={{ backgroundImage: "url('/assets/images/texture.svg')" }}>
            {/* Header Chat */}
            <div className="flex items-center py-2  px-4 bg-white rounded-t-xl shadow-md">
                <img src="https://ngnqrvzddtpdmmjpfkkm.supabase.co/storage/v1/object/public/profile-photos/photos/8-1736594586171" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold">Bambang Putra Amsal Gautama</p>
                    <p className="text-xs text-green-500">Walking</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length > 0 ? messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "self" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex flex-col gap-1 ${msg.sender === "self" ? "items-end" : "items-start"} `}>
                            <div className={`py-2 px-3 max-w-xs rounded-lg text-white text-sm 
                                ${msg.sender === "self" ? "bg-[#1E4FBC] text-white rounded-br-none" : "bg-[#0D2352] text-white rounded-bl-none"}`}>
                                {msg.chat}
                            </div>
                            <p className="text-[12px] text-non-active">{msg.created_at.split("T")[1].slice(0, 5)}</p>
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-500 text-center">Belum ada percakapan</p>
                )}
            </div>

            {/* Input Chat */}
            <div className="flex items-center p-3 border-t bg-white rounded-b-xl">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg focus:outline-none"
                    placeholder="Tulis pesan..."
                />
                <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;