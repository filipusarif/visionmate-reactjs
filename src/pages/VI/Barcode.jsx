import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import useSession from '../../hooks/useSession';
import { UserAuth } from '../../components/context/AuthContext';
import Navbar from '../../components/fragments/navbar';

const Barcode = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    const isFirstRender = useRef(true);
    
    // useEffect(() => {
    //     // Menghentikan sintesis suara yang masih berlangsung jika ada
    //     if (window.speechSynthesis.speaking) {
    //         window.speechSynthesis.cancel();
    //     }
    // }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        
            // Pesan sapaan awal
            const initialMessage = "Halo mate, kamu di halaman profil!";
        
            // Text-to-Speech untuk pesan awal
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(initialMessage);
            utterance.lang = "id-ID";
            synth.speak(utterance);
        }
      }, []); // Dipanggil sekali saat komponen dirender
    return (
        <>
            <Navbar session={userData} mode="vi" />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Generate Barcode</h1>
                {userData ? (
                    <QRCodeCanvas
                    value={userData.id.toString()} 
                    size={256}
                    level="H"
                    className="shadow-lg"
                    />
                ) : (
                    <p>Loading...</p>
                )}
                <p className="mt-4 text-gray-600">Scan barcode ini untuk menghubungkan ke penjaga.</p>
            </div>
        </>
    );
};

export default Barcode;
