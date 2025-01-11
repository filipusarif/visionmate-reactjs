    import React, { useState, useEffect } from 'react';
    import { supabase } from '../../services/lib/supabaseClient';
    import { QRCodeCanvas } from 'qrcode.react';
    import Cookies from 'js-cookie';

    const Barcode = () => {
        const [userId, setUserId] = useState(null);

        useEffect(() => {
            const savedSession = Cookies.get("userSession");
            console.log("Saved session cookie:", savedSession); // Tambahkan ini
            if (savedSession) {
                try {
                    const parsedSession = JSON.parse(savedSession);
                    console.log("Parsed session:", parsedSession); // Tambahkan ini
                    setUserId(parsedSession.id); 

                    if (parsedSession && parsedSession.id) {
                        setUserId(parsedSession.id);
                    } else {
                        console.warn("Parsed session does not contain an id.");
                    }
                } catch (error) {
                    console.error("Error parsing session cookies:", error);
                }
            } else {
                console.warn("No session cookies found.");
            }
        }, []);
        

        
        
        document.cookie.split(';').forEach(cookie => console.log(cookie));



        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Generate Barcode</h1>
                {userId ? (
                    <QRCodeCanvas
                        value={userId} 
                        size={256}
                        level="H"
                        className="shadow-lg"
                    />
                ) : (
                    <p>Loading...</p>
                )}
                <p className="mt-4 text-gray-600">Scan barcode ini untuk menghubungkan ke penjaga.</p>
            </div>
        );
    };

    export default Barcode;
