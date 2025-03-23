import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { supabase } from '../../services/lib/supabaseClient';
import { toast, ToastContainer } from 'react-toastify'; 
import { UserAuth } from '../../components/context/AuthContext';
import useSession from '../../hooks/useSession';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/fragments/navbar';
import LoadingPage from '../LoadingPage';



const Scan = () => {
    const [data, setData] = useState(''); // Menyimpan hasil scan barcode
    const [error, setError] = useState(null); // Menyimpan error (jika ada)
    const [status, setStatus] = useState(''); // Status penyimpanan ke Supabase
    const guardId = useRef(null);
    const lastScannedData = useRef(null); // Tambahan untuk mencegah duplikasi
    const toastShownRef = useRef(true); 
    const toastVisibleRef = useRef(false);
    const navigate = useNavigate();


    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);

    useEffect(() => {
        if (userData) {
            guardId.current = userData.id;
        }
    }, [userData]);

    useEffect(() => {
        console.log(guardId.current)
    }, [guardId])


    const checkIfBarcodeExists = async (scannedData) => {
        const { data, error } = await supabase
            .from('connections')
            .select('vi_id, guard_id')
            .eq('vi_id', scannedData)
            .eq('guard_id', guardId.current)
            .single()

        if (error) {
            console.error("Error checking barcode:", error);
            return false; 
        } else {
            return true;
        }
    };

    const saveToSupabase = async (scannedData) => {
        if (!guardId.current) {
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
            console.log("save",guardId.current)
            console.log("save2",scannedData)
            const { error } = await supabase
                .from('connections')
                .insert([
                    {
                        vi_id: scannedData,
                        guard_id: guardId.current,
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

            navigate("/guard/monitoring")
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

        // Reset lastScannedData setelah beberapa waktu (opsional)
        setTimeout(() => {
            lastScannedData.current = null;
        }, 1000); // Reset setelah 5 detik

    };

    return (
        <>
        {userData ? (
            <>
        {/* <Navbar session={userData} mode={"guard"} /> */}
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Scan Barcode</h1>
            <div className="w-80 h-80 bg-white shadow-lg rounded-lg">
                <QrReader
                    constraints={{ facingMode: "environment" }} // Menggunakan kamera belakang
                    onResult={(result, error) => {
                        if (result) {
                            const scannedData = result.text;
                            // Periksa apakah barcode sudah diproses
                            if (lastScannedData.current === scannedData) {
                                console.log("Barcode sudah diproses.");
                                return;
                            }
                            lastScannedData.current = scannedData;
                            console.log(scannedData);
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
                { error ? (
                    <p className="text-red-600 text-center">{error}</p>
                ) : (
                    <p className="text-gray-600 text-center">Arahkan kamera ke barcode untuk memulai scan.</p>
                )}
                {/* {data ? (
                    <p className="text-green-600">Data hasil scan: {data}</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                        ) : (
                            <p className="text-gray-600">Arahkan kamera ke barcode untuk memulai scan.</p>
                            )} */}
            </div>

            {status && <p className="mt-2 text-blue-600">{status}</p>}

            <ToastContainer />
        </div>
        </>
        ):(
            <LoadingPage />
        )}
        </>
    );
};

export default Scan;
