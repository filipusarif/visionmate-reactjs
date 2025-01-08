import React, { useState, useEffect, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { supabase } from '../../services/lib/supabaseClient';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Scan = () => {
    const [data, setData] = useState(''); // Menyimpan hasil scan barcode
    const [error, setError] = useState(null); // Menyimpan error (jika ada)
    const [status, setStatus] = useState(''); // Status penyimpanan ke Supabase
    const [guardId, setGuardId] = useState('664aa89f-ecfa-4b62-bd65-a35d18566a7f'); // ID pengguna yang login
    const toastShownRef = useRef(true); 
    const toastVisibleRef = useRef(false);

    // Ambil ID guard dari sesi login
    useEffect(() => {
        const fetchGuardId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
            } else if (data?.session?.user?.id) {
                setGuardId(data.session.user.id); 
            } else {
                console.warn("No active session found.");
            }
        };
        fetchGuardId();
    }, []);

    const checkIfBarcodeExists = async (scannedData) => {
        const { data, error } = await supabase
            .from('connections')
            .select('vi_id, guard_id')
            .eq('vi_id', scannedData)
            .eq('guard_id', guardId)
            .single(); 

        if (error) {
            console.error("Error checking barcode:", error);
            return false; 
        } else {
            return true;
        }
    };

    const saveToSupabase = async (scannedData) => {
        if (!guardId) {
            console.error("Guard ID belum tersedia.");
            setStatus('Guard ID belum ditemukan.');
            return;
        }

        // Cek jika barcode sudah terhubung dengan guard_id
        const barcodeExists = await checkIfBarcodeExists(scannedData);
        if (barcodeExists) {
            setStatus('Barcode sudah terhubung dengan guard ID ini.');
            if (toastShownRef.current) {
                toastShownRef.current = false; 
                if( !toastVisibleRef.current ){
                    toastVisibleRef.current = true
                    toast.info('Barcode sudah terhubung dengan guard ID ini.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeButton: false,
                        onClose: () => toastVisibleRef.current = false, 
                    });
                }
            }
            return;
        }

        // Jika barcode belum ada atau belum terhubung, simpan ke database
        setStatus('Menyimpan data...');
        try {
            const { error } = await supabase
                .from('connections')
                .insert([
                    {
                        vi_id: scannedData,
                        guard_id: guardId,
                    },
                ]);

            if (error) {
                throw error;
            }

            setStatus('Data berhasil disimpan.');
            if (toastShownRef.current) {
                toastShownRef.current = false; 
                if( !toastVisibleRef.current){
                    toastVisibleRef.current = true;
                    toast.success('Data berhasil disimpan!', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeButton: false,
                        onClose: () => toastVisibleRef.current = false, 
                    });
                } 
            }
        } catch (err) {
            console.error(err);
            setStatus('Gagal menyimpan data.');
            if (toastShownRef.current) {
                toastShownRef.current = false; 
                if( !toastVisibleRef.current){
                    toastVisibleRef.current = true;
                    toast.error('Gagal menyimpan data.', {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeButton: false,
                    onClose: () => toastVisibleRef.current = false, 
                });
                }
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Scan Barcode</h1>
            
            <div className="w-80 h-80 bg-white shadow-lg rounded-lg">
                <QrReader
                    constraints={{ facingMode: "environment" }} // Menggunakan kamera belakang
                    onResult={(result, error) => {
                        if (result) {
                            const scannedData = result.text;
                            setData(scannedData); 
                            saveToSupabase(scannedData); 
                        }
                        if (error) {
                            toastShownRef.current = true;
                            setError('Tidak dapat membaca barcode. Pastikan kamera menghadap barcode.');
                        }
                    }}
                    containerStyle={{ width: '100%', height: '100%' }}
                />
            </div>

            <div className="mt-4">
                {data ? (
                    <p className="text-green-600">Data hasil scan: {data}</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <p className="text-gray-600">Arahkan kamera ke barcode untuk memulai scan.</p>
                )}
            </div>

            {status && <p className="mt-2 text-blue-600">{status}</p>}

            <ToastContainer />
        </div>
    );
};

export default Scan;
