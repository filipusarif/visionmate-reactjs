import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import useSession from '../../hooks/useSession';
import { UserAuth } from '../../components/context/AuthContext';
import Navbar from '../../components/fragments/navbar';

const Barcode = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    
    return (
        <>
            <Navbar  session={userData}/>
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
