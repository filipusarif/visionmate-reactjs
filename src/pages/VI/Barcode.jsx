import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Barcode = () => {
    const userId = "3e08fc7d-e617-4374-9ebb-b0b20220e972"; // Ganti dengan ID unik dari pengguna tunanetra

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Generate Barcode</h1>
            <QRCodeCanvas
                value={userId}
                size={256}
                level="H"
                className="shadow-lg"
            />
            <p className="mt-4 text-gray-600">Scan barcode ini untuk menghubungkan ke penjaga.</p>
        </div>
    );
};

export default Barcode;
