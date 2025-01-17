import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../../components/fragments/map";
import Camera from "../../components/fragments/camera";
import MateContent from "../../components/fragments/matecontent";
import useSession from "../../hooks/useSession";
import { UserAuth } from "../../components/context/AuthContext";
import Navbar from "../../components/fragments/navbar";
import Cookies from "js-cookie";
import LoadingPage from "../LoadingPage";
// import NavbarMobile from "../../components/fragments/navbarmobile";

const Assistant = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupFirst, setShowPopupFirst] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [cameraResponse, setCameraResponse] = useState("");
    const pressTimer = useRef(null);
    const closeTimer = useRef(null);
    const recognitionRef = useRef(null);
    const [map, setMap] = useState("");
    const [countdown, setCountdown] = useState(35); 

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
        if (showPopupFirst) {
            // Text to Speech saat modal pertama kali muncul
            const utterance = new SpeechSynthesisUtterance("Informasi Penggunaan!, tekan pada pinggir layar untuk mengabaikan informasi ini. cara penggunaan 1. Tahan layar di manapun selama 2 detik untuk memulai perintah suara. 2. Berikan perintah setelah VisionMate selesai mengatakan “Halo mate, ada apa?”. 3. Anda bisa melakukan navigasi ke halaman apapun menggunakan voice command contoh pindahkan saya ke halaman login, arahkan saya ke Poliklinik Dian Nuswantoro, atau perintah lainnya");
            utterance.lang = "id-ID";
            window.speechSynthesis.speak(utterance);

            // Auto-close setelah 5 detik
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setShowPopupFirst(false); // Tutup popup setelah countdown selesai
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearTimeout(interval);
        }
    }, [showPopupFirst]);

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

    const handleMouseDown = () => {
        pressTimer.current = setTimeout(() => {
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


    return (
        <>
            <section
                className="flex md:flex-row-reverse flex-col w-screen h-screen relative overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >
                {userData ? (
                    <>
                        <Navbar session={userData} mode="vi"/>
                        <MapComponent to={map} id={userData.id}>
                            <Camera setCameraResponse={handleDataFromChild} />
                            {/* <button className="z-10 block lg:hidden absolute top-20 right-5 outline-none bg-secondary p-3 rounded-full shadow-lg shadow-dark">
                                <img src="assets/images/flash.svg" alt="" />
                            </button> */}
                        </MapComponent>
                        <MateContent
                            message={transcript}
                            responseTxt={cameraResponse}
                            setMap={handleDataMap}
                        />
                        {/* <NavbarMobile /> */}
                         <div
                            className={`absolute  inset-0 flex items-end lg:items-center justify-center bg-black bg-opacity-20 z-50 
                                ${showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}
                                transition-all duration-2000 ease-in-out`}
                        >
                            <div className="bg-white lg:hidden gap-5 relative border-secondary border-t-[25px] p-4 rounded-t-xl shadow w-full lg:w-[40%] h-[20rem] lg:h-[30%] flex justify-center items-center flex-col">
                                <div className="w-[20%] left-[40%] h-[5px] bg-background absolute -top-3.5 rounded-full z-50" />
                                <p className="text-lg font-medium">Halo Mate, Ada apa?</p>
                                <img
                                    src="assets/images/assistant/mic.svg"
                                    className="p-5 bg-secondary rounded-full shadow-xl"
                                    alt=""
                                />
                                {isListening ? (
                                    <p>Mendengarkan...</p>
                                ):(
                                    <p>...</p>
                                )}
                            </div>
                            <div className="bg-white hidden gap-5 relative  p-5 rounded-xl shadow w-full lg:w-[30%] h-fit lg:flex justify-center items-center flex-col">
                                {/* <div className="w-[20%] left-[40%] h-[5px] bg-background absolute -top-3.5 rounded-full z-50" /> */}
                                <p className="text-lg font-medium">Halo Mate, Ada apa?</p>
                                <img
                                    src="assets/images/assistant/mic.svg"
                                    className="p-5 bg-secondary rounded-full shadow-xl"
                                    alt=""
                                />
                                {isListening ? (
                                    <p>Mendengarkan...</p>
                                ):(
                                    <p>...</p>
                                )}
                            </div>
                        </div>
                        {/* Modal Pop-Up */}
                        {showPopupFirst && (
                            <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 popup-overlay"
                            onClick={handleOutsideClick}
                        >
                            <div className="bg-white p-5 md:p-10 rounded-lg shadow-lg w-[90%] md:w-[30%] flex flex-col items-center justify-center gap-3">
                                <img src="assets/images/warning.svg" alt="" className="w-[7rem]" />
                                <h1 className="font-bold text-lg">HARAP DIPERHATIKAN!!</h1>
                                <p className="w-full text-left">Cara Penggunaan</p>
                                <ol>
                                    <li>1. Tahan layar di manapun selama 2 detik untuk memulai perintah suara.</li>
                                    <li>2. Berikan perintah setelah VisionMate selesai mengatakan “Halo mate, ada apa?”.</li>
                                    <li>3. Anda bisa melakukan navigasi ke halaman apapun menggunakan voice command (contoh : “pindahkan saya ke halaman login”, "arahkan saya ke Poliklinik Dian Nuswantoro", dsb)</li>
                                </ol>
                                <div className="flex gap-3 flex-col-reverse md:flex-row items-center justify-between w-full">

                                <button
                                    onClick={handleClosePopup}
                                    className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
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
                        )}
                    </>
                ) : (
                    <LoadingPage />
                )}
            </section>
        </>
    );
};

export default Assistant;
