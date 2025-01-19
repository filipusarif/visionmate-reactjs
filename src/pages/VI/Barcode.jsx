import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import useSession from '../../hooks/useSession';
import { UserAuth } from '../../components/context/AuthContext';
import Navbar from '../../components/fragments/navbar';
import LoadingPage from '../LoadingPage';
import Popup from '../../components/elements/popup';
import chat from '../../services/api/chat';

const Barcode = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    const isFirstRender = useRef(true);

    // ================ popup control ===================
    const [showPopup, setShowPopup] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const pressTimer = useRef(null);
    const closeTimer = useRef(null);
    const recognitionRef = useRef(null);
    
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
            const initialMessage = "Halo mate, kamu di halaman profil! scan barcode kamu untuk terhubung dengan penjaga";
        
            // Text-to-Speech untuk pesan awal
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(initialMessage);
            utterance.lang = "id-ID";
            synth.speak(utterance);
        }
    }, []); 


    // ================================= Popup Modal Controll ===================================
    const handleMouseDown = () => {
        if(userData?.role === "VI"){
        pressTimer.current = setTimeout(() => {
            window.speechSynthesis.cancel();
            setShowPopup(true);
        }, 1500);
        }
    };

    const handleMouseUp = () => {
        if(userData?.role === "VI"){
        clearTimeout(pressTimer.current);

        if (showPopup) {
            closeTimer.current = setTimeout(() => {
                setShowPopup(false);
            }, 100);
        }
        }
    };

    useEffect(() => {
            if (showPopup) {
                const utterance = new SpeechSynthesisUtterance("Halo Mate, mau pindah halaman?");
                utterance.lang = "id-ID";
                utterance.onend = () => {
                    if (recognitionRef.current) {
                        recognitionRef.current.start();
                        setIsListening(true);
                    }
                };
                window.speechSynthesis.speak(utterance);
            } else {
                if (recognitionRef.current && isListening) {
                    recognitionRef.current.stop();
                    setIsListening(false);
                }
            }
        }, [showPopup]);

        useEffect(() => {
                if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    recognitionRef.current = new SpeechRecognition();
                    recognitionRef.current.continuous = false;
                    recognitionRef.current.interimResults = false;
                    recognitionRef.current.lang = "id-ID";
        
                    recognitionRef.current.onresult = (event) => {
                        const result = event.results[0][0].transcript;
                        setTranscript(result);
                        console.log("Recognized speech:", result);
                    };
        
                    recognitionRef.current.onerror = (event) => {
                        console.error("Speech recognition error:", event.error);
                    };
                } else {
                    console.error("Speech Recognition API is not supported in this browser.");
                }
            }, []);

        useEffect(() => {
            handleSubmitVoice(transcript);
        },[transcript]);

        const executeAction = (action, value) => {
            if (action === "switch") {
            window.location.href = value;
            } else if (action === "go") {
            setMap(value);
            } else if (action === "control") {
            console.log(`Control interval set to: ${value} ms`);
            }
        };


        const handleSubmitVoice = async (inputMessage) => {
            const textToSend = inputMessage || inputValue;
            console.log(textToSend);
        
            if (!textToSend) {
            alert("Please enter a question.");
            return;
            }
        
            try {
            const data = await chat(textToSend);
            const { action, value } = data;
            executeAction(action, value);
            } catch (error) {
            console.log(error)
            }
        };

    return (
        <div className='bg-gray-50 w-screen h-screen relative overflow-hidden' 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}>
            <Navbar session={userData} mode="vi" />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100" 
            >
                <h1 className="text-2xl font-bold mb-4">Barcode Saya</h1>
                {userData ? (
                    <QRCodeCanvas
                    value={userData.id.toString()} 
                    size={256}
                    level="H"
                    className="shadow-lg"
                    />
                ) : (
                    <LoadingPage />
                )}
                <p className="mt-4 text-gray-600">Scan barcode ini untuk menghubungkan ke penjaga.</p>
            </div>
            <Popup text="Halo Mate, mau pindah halaman?" showPopup={showPopup} isListening={isListening} />
        </div>
    );
};

export default Barcode;
