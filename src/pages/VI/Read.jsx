import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../../components/fragments/map";
import Camera from "../../components/fragments/camera";
import MateContent from "../../components/fragments/matecontent";
import useSession from "../../hooks/useSession";
import { UserAuth } from "../../components/context/AuthContext";
import Navbar from "../../components/fragments/navbar";
import Cookies from "js-cookie";
import LoadingPage from "../LoadingPage";
import NavbarMobile from "../../components/fragments/navbarmobile";
import Popup from '../../components/elements/popup';
import { supabase } from "../../services/lib/supabaseClient";
import Sidebar, { SidebarItem } from "../../components/fragments/sidebar";
import { Link } from "react-router-dom";
import ReadCamera from "../../components/fragments/read";
import ReadContent from "../../components/fragments/readcontent";
import SidebarLayout from "../../components/layouts/Sidebar";
import IncomingCall from "../../components/elements/call";


const Read = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupFirst, setShowPopupFirst] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [cameraResponse, setCameraResponse] = useState("");
    const pressTimer = useRef(null);
    const closeTimer = useRef(null);
    const recognitionRef = useRef(null);
    const [map, setMap] = useState("");
    const [read, setRead] = useState(false);
    const [countdown, setCountdown] = useState(35); 
    const [sensor, setSensor] = useState(null);

    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);

    useEffect(() => {
        window.speechSynthesis.cancel();
        
    },[])

    useEffect(() => {
        // Periksa apakah ini login pertama
        const firstLogin = Cookies.get("firstLogin");
        if (firstLogin) {
            setShowPopupFirst(true);
            Cookies.remove("firstLogin");
        }
    }, []);

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
                // console.log("Recognized speech:", result);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
            };
        } else {
            console.error("Speech Recognition API is not supported in this browser.");
        }
    }, []);

    const handleMouseDown = () => {
        pressTimer.current = setTimeout(() => {
            window.speechSynthesis.cancel();
            setShowPopup(true);
        }, 1500);
    };

    const handleMouseUp = () => {
        clearTimeout(pressTimer.current);

        if (showPopup) {
            closeTimer.current = setTimeout(() => {
                setShowPopup(false);
            }, 100);
        }
    };

    const handleClosePopup = () => {
        window.speechSynthesis.cancel();
        setShowPopupFirst(false);
        clearTimeout(closeTimer.current);
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("popup-overlay")) {
            window.speechSynthesis.cancel();
            setShowPopupFirst(false);
        }
    };

    useEffect(() => {
        if (showPopup) {
            const utterance = new SpeechSynthesisUtterance("Halo Mate, ada apa?");
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

    const handleDataFromChild = (data) => {
        setCameraResponse(data);
    };

    const handleDataMap = (data) => {
        setMap(data);
    };

    const handleDataRead = (data) => {
        setRead(data);
    }

    return (
        <>
            {userData ? (
                <>
                    <IncomingCall viId={userData.id}/>
                    <section
                        className="flex lg:flex-row-reverse flex-col bg-[#e9effd] w-screen h-screen relative overflow-hidden"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}
                    >
                            <>
                                {/* <Navbar session={userData} mode="vi"/> */}
                                <div
                                className="flex lg:p-5 lg:flex-row-reverse gap-5 flex-col w-full h-full relative overflow-hidden"
                                >
                                    <div className="lg:p-5 bg-background lg:rounded-2xl flex lg:flex-col gap-2 flex-col w-full h-full relative overflow-hidden">
                                        <p className="text-lg mb-0 font-bold text-non-active text-center lg:text-start hidden lg:block">ReadThat</p>
                                        <div className="lg:p-0 bg-background lg:rounded-xl flex lg:flex-row-reverse gap-0 lg:gap-5 flex-col w-full h-full relative overflow-hidden">
                                            <ReadCamera setCameraResponse={handleDataFromChild} readStatus={read} setRead={handleDataRead}/>
                                            <ReadContent
                                                message={transcript}
                                                responseTxt={cameraResponse}
                                                setRead={handleDataRead}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <SidebarLayout type={"vi"} userData={userData}/>
                                <NavbarMobile />
                                <Popup text="Halo Mate, ada apa?" showPopup={showPopup} isListening={isListening} />
                                {/* Modal Pop-Up */}
                                {/* {showPopupFirst && (
                                    <div
                                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 popup-overlay"
                                    onClick={handleOutsideClick}
                                >
                                    <div className="bg-white p-5 lg:p-10 rounded-lg shadow-lg w-[90%] lg:w-[30%] flex flex-col items-center justify-center gap-3">
                                        <img src="assets/images/warning.svg" alt="" className="w-[7rem]" />
                                        <h1 className="font-bold text-lg">HARAP DIPERHATIKAN!!</h1>
                                        <p className="w-full text-left">Cara Penggunaan</p>
                                        <ol>
                                            <li>1. Tahan layar di manapun selama 2 detik untuk memulai perintah suara.</li>
                                            <li>2. Berikan perintah setelah VisionMate selesai mengatakan “Halo mate, ada apa?”.</li>
                                            <li>3. Anda bisa melakukan navigasi ke halaman apapun menggunakan voice command (contoh : “pindahkan saya ke halaman login”, "arahkan saya ke Poliklinik Dian Nuswantoro", dsb)</li>
                                        </ol>
                                        <div className="flex gap-3 flex-col-reverse lg:flex-row items-center justify-between w-full">

                                        <button
                                            onClick={handleClosePopup}
                                            className="bg-blue-500 text-white px-4 py-2 rounded w-full lg:w-auto"
                                            >
                                            Tutup
                                        </button>
                                        <div className="flex flex-col w-full items-end">
                                            <p>Menutup {countdown} detik</p>
                                            <p className="text-[10px]">tekan dipinggir untuk mengabaikan informasi</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                )} */}
                            </>
                    </section>
                </>
            ) : (
                <LoadingPage />
            )}
        </>
    );
};

export default Read;
