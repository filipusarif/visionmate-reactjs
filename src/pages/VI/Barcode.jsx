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
import SidebarLayout from "../../components/layouts/Sidebar";
import { Link } from "react-router-dom";
import Back from '../../components/elements/back';
import IncomingCall from '../../components/elements/call';

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
        <>
        {userData  ? (
            <>
                <IncomingCall viId={userData.id}/>
                <div className='bg-soft-background w-screen h-screen relative overflow-hidden lg:flex' 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}>
                    {/* <Navbar session={userData} mode="vi" /> */}
                    <SidebarLayout type={"vi"} userData={userData}/>            
                    
                    
                    <div
                    className="flex lg:p-5 lg:flex-row-reverse flex-col w-full gap-5 h-full relative overflow-hidden"
                    >
                        <div className="lg:p-5  bg-background lg:rounded-2xl flex lg:flex-col lg:gap-2 flex-col w-full h-full relative overflow-hidden">
                            <p className="text-lg mb-0 font-bold text-non-active text-center lg:text-start hidden lg:block">Barcode</p>
                            <div className='w-full px-4 block lg:hidden'>
                                <Back title={"QR Code"} to={"/vi"} />
                            </div>
                            <div className="w-full flex flex-col items-center justify-center h-full bg-soft-background bg-opacity-40 lg:bg-transparent" 
                            >
                                    <div className='w-[90%] lg:w-[40%] bg-background relative shadow-xl flex justify-center gap-5 items-center pt-16 rounded-xl p-10 flex-col'>
                                        <img src={ photo?.photo } alt="" className='w-[7rem] bg-background h-[7rem] -top-14 rounded-full shadow-lg absolute border-4 border-background ' />
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
                                <p className="mt-4 text-gray-600">Scan barcode ini untuk menghubungkan ke penjaga.</p>
                            </div>
                        </div>
                    </div>
                    <NavbarMobile />
                    <Popup text="Halo Mate, mau pindah halaman?" showPopup={showPopup} isListening={isListening} />
                </div>
            </>
        ) : (
            <LoadingPage />
        )}
        </>
    );
};

export default Barcode;
