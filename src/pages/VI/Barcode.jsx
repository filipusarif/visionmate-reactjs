import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/lib/supabaseClient';
import { QRCodeCanvas } from 'qrcode.react';

const Barcode = () => {
    const [userId, setUserId] = useState(null); 

    // Ambil ID user dari sesi login
    useEffect(() => {
        const fetchUserId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
            } else if (data?.session?.user?.id) {
                setUserId(data.session.user.id); // Set state dengan ID user
            } else {
                console.warn("No active session found.");
            }
        };
        fetchUserId();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Generate Barcode</h1>
            {userId ? (
                <QRCodeCanvas
                    value={userId} // Berikan nilai string ke QRCodeCanvas
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
