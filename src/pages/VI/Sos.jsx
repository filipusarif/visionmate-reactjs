import React from 'react';
import Back from '../../components/elements/back';
import NavbarMobile from '../../components/fragments/navbarmobile';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../services/lib/supabaseClient';
import { UserAuth } from '../../components/context/AuthContext';
import useSession from '../../hooks/useSession';
import LoadingPage from '../LoadingPage';
import Popup from '../../components/elements/popup';
import chat from '../../services/api/chat';
import sosChat from '../../services/api/sos';
import Navbar from '../../components/fragments/navbar';

const SOS = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    const isFirstRender = useRef(true);
    const [guards, setGuards] = useState([]);
    const [data, setData] = useState(null);
    const prevGuards = useRef([]);

    useEffect(() => {
            if (isFirstRender.current) {
                window.speechSynthesis.cancel();

                isFirstRender.current = false;
            
                // Pesan sapaan awal
                const initialMessage = "Halo mate, Butuh Bantuan sekarang?!";
            
                // Text-to-Speech untuk pesan awal
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(initialMessage);
                utterance.lang = "id-ID";
                synth.speak(utterance);
            }
        }, []); 


    // ================ popup control ===================
    const [showPopup, setShowPopup] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const pressTimer = useRef(null);
    const closeTimer = useRef(null);
    const recognitionRef = useRef(null);

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
                const utterance = new SpeechSynthesisUtterance("Halo Mate, butuh bantuan?");
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

        const executeAction = async (action, value) => {
            if (action === "switch") {
            window.location.href = value;
            } else if (action === "go") {
            setMap(value);
            } else if (action === "sos") {
                await sosChat(value, userData.id, data);
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


    useEffect(() => {
            const fetchUserData = async () => {
                if (userData?.id) {
                    try {
                        const { data, error } = await supabase
                            .from("users")
                            .select("id,phone, fullName, email, language, role, photo, duration, destination, longitude, latitude")
                            .eq("id", userData.id)
                            .single();
    
                        if (error) throw error;
                        console.log(data)
                        setData(data);
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    }
                }
            };
    
            fetchUserData();
        }, [userData]);


        useEffect(() => {
            const fetchLatestResponse = async () => {
                if (userData?.id) {
                    try {
                        const { data, error } = await supabase
                            .from('respons')
                            .select(`
                                chat,
                                guard_email,
                                users:guard_email(fullName, photo)
                            `)
                            .eq('vi_id', userData.id)
                            .order('created_at', { ascending: false })
                            .limit(1);
        
                        if (error) throw error;
        
                        // Cek jika data baru berbeda dari data sebelumnya
                        if (JSON.stringify(data) !== JSON.stringify(prevGuards.current)) {
                            // Simpan data terbaru
                            prevGuards.current = data;
                        }
        
                        setGuards(data);
                    } catch (error) {
                        console.error("Error fetching latest response:", error);
                    }
                }
            };
        
            // Buat interval untuk polling
            const intervalId = setInterval(() => {
                fetchLatestResponse();
            }, 1000); // Polling setiap 5 detik
        
            // Bersihkan interval saat komponen di-unmount
            return () => clearInterval(intervalId);
        }, [userData]);

        useEffect(()=> {
            if (!prevGuards.current) return
            const utterance = new SpeechSynthesisUtterance(prevGuards.current[0]?.chat);
            utterance.lang = "id-ID";
            window.speechSynthesis.speak(utterance);
        },[prevGuards.current])

        
        
        return (
            <>
            {data ? (
                <div 
                    className="bg-[#F8F9FF] min-h-screen w-screen overflow-hidden relative flex flex-col items-center" 
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                >
                    <Navbar session={userData} mode="vi" />

                    <div className='container mx-auto px-4 md:px-8 lg:px-16 lg:mt-20'>
        
                        <Back title={"SOS"} to={"/vi"} />
        
                        {/* Header */}
                        <div className="w-full container mx-auto flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-sm p-4 mb-4 mt-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                    <img src={data.photo} alt="Profile" className="w-10 h-10 rounded-full" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{data.fullName}</p>
                                    <p className="text-sm text-gray-500">{data.role === "VI" ? "Visual Impairment" : "Guard"}</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-end justify-center mt-4 md:mt-0'>
                                <p className="font-bold text-gray-800">Universitas Dian</p>
                                <p className="text-sm text-gray-500 cursor-pointer">Lokasi Anda</p>
                            </div>
                        </div>
        
                        {/* Main Content */}
                        <div className="w-full container mx-auto bg-white rounded-lg shadow-sm p-6 text-center flex flex-col gap-5 items-center">
                            <p className="font-bold text-lg text-gray-800">HALO MATE, APAKAH ANDA PERLU BANTUAN?</p>
        
                            {/* SOS Button */}
                            <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center relative">
                                <div className="w-32 h-32 rounded-full bg-blue-300 flex items-center justify-center animate-ping absolute" />
                                <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center z-10">
                                    <span className="text-white font-bold text-xl">SOS</span>
                                </div>
                            </div>
        
                            {/* Response Section */}
                            <div className="w-full mt-6">
                                <p className="font-bold text-gray-800 text-left">Respons Penjaga</p>
                                <div className="flex flex-wrap gap-6 mt-4 pb-20">
                                    {/* Response Card */}
                                    {guards.length > 0 ? (
                                        guards.map((guard, index) => (
                                            <div key={index} className="flex items-center w-full md:w-48 lg:w-full bg-background rounded-lg p-4 ">
                                                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-4">
                                                    <img src={guard.users.photo} alt="Profile" className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className='flex flex-col items-start justify-center gap-1 w-full'>
                                                    <p className="font-bold text-secondary text-md w-full rounded-lg text-center bg-blue-200 ">{guard.users.fullName}</p>
                                                    <p className="text-md text-gray-500 text-left">Universitas Dian Nuswantoro</p>
                                                    <p className='text-sm text-gray-500 text-left'>{guard.chat}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">Tidak ada respons terbaru.</p>
                                    )}
                                </div>
                            </div>
                        </div>
        
                    </div>
        
                    {/* Footer */}
                    <NavbarMobile />
                    <Popup text="Halo Mate, Butuh Bantuan?" showPopup={showPopup} isListening={isListening} />
                </div>
            ) : (
                <LoadingPage />
            )}
            </>
        );
        
};

export default SOS;
