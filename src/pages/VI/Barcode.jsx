import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import useSession from '../../hooks/useSession';
import { UserAuth } from '../../components/context/AuthContext';
import Navbar from '../../components/fragments/navbar';
import LoadingPage from '../LoadingPage';
import Popup from '../../components/elements/popup';
import chat from '../../services/api/chat';
import NavbarMobile from '../../components/fragments/navbarmobile';
import { supabase } from '../../services/lib/supabaseClient';
import Sidebar, { SidebarItem } from "../../components/fragments/sidebar";
import { Link } from "react-router-dom";

const Barcode = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    const isFirstRender = useRef(true);

    const [photo, setPhoto] = useState(null);

    useEffect(() => {
            const fetchUserData = async () => {
                if (userData?.id) {
                    try {
                        const { data, error } = await supabase
                            .from("users")
                            .select("photo, fullName")
                            .eq("id", userData.id)
                            .single();
    
                        if (error) throw error;
                        console.log(data)
                        setPhoto(data);
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    }
                }
            };
    
            fetchUserData();
        }, [userData]);

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
            window.speechSynthesis.cancel();
            isFirstRender.current = false;
        
            // Pesan sapaan awal
            const initialMessage = "Halo mate, kamu di halaman barcode! scan barcode kamu untuk terhubung dengan penjaga";
        
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
        <div className='bg-soft-background w-screen h-screen relative overflow-hidden lg:flex' 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}>
            {/* <Navbar session={userData} mode="vi" /> */}
            <Sidebar session={userData} >
                <Link to={"/vi"}><SidebarItem text={"Assistant"} icon={"/assets/images/mobile/assistant.svg"}/></Link>
                <Link to={"/vi/sos"}><SidebarItem text={"sos"} icon={"/assets/images/mobile/assistant.svg"}/></Link>
                <Link to={"/vi/barcode"}><SidebarItem text={"barcode"} icon={"/assets/images/mobile/assistant.svg"}/></Link>
                <Link to={"/vi/profile"}><SidebarItem text={"Profile"} icon={"/assets/images/mobile/assistant.svg"}/></Link>
            </Sidebar>
            <div className='w-full flex justify-between shadow-lg lg:hidden items-center relative top-0 container pt-5 bg-soft-background'>
                <Link to={"/vi"}>
                    <img src="/assets/images/back.svg" alt="" />
                </Link>
                <h1 className='font-bold'>QR CODE</h1>
                <span></span>
            </div>
            <div className="w-full flex flex-col lg:pt-32 items-center justify-center h-screen bg-soft-background" 
            >
                {userData  ? (
                    <div className='w-[90%] lg:w-[40%] -translate-y-10  bg-background relative flex justify-center gap-5 items-center pt-16 rounded-xl p-10 flex-col'>
                        <img src={ photo?.photo } alt="" className='w-[7rem] bg-background h-[7rem] -top-14 rounded-full absolute border-4 border-background ' />
                        <div className='flex w-full items-center flex-col gap-0'>
                        <h1 className="text-2xl font-bold text-dark ">{photo?.fullName}</h1>
                        <p className="text-xl text-dark ">VISUAL IMPAIRMENT</p>
                        </div>
                        <QRCodeCanvas
                        value={userData.id.toString()} 
                        size={256}
                        level="H"
                        className=""
                        />
                    </div>
                ) : (
                    <LoadingPage />
                )}
                <p className="mt-4 text-gray-600">Scan barcode ini untuk menghubungkan ke penjaga.</p>
            </div>
            <NavbarMobile />
            <Popup text="Halo Mate, mau pindah halaman?" showPopup={showPopup} isListening={isListening} />
        </div>
    );
};

export default Barcode;
