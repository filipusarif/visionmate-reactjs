import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../../components/fragments/map";
import Camera from "../../components/fragments/camera";
import MateContent from "../../components/fragments/matecontent";
import useSession from "../../hooks/useSession";
import { UserAuth } from "../../components/context/AuthContext";
import Navbar from "../../components/fragments/navbar";
import NavbarMobile from "../../components/fragments/navbarmobile";

const Assistant = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [cameraResponse, setCameraResponse] = useState("");
    const pressTimer = useRef(null);
    const closeTimer = useRef(null);
    const recognitionRef = useRef(null);
    const [map, setMap] = useState("");

    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);

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
        setShowPopup(false);
        clearTimeout(closeTimer.current);
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

    useEffect(() => {
        if (!map) return;
        console.log("map assistant", map);
    }, [map]);

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
                        <MapComponent to={map} id={userData.id}>
                            <Camera setCameraResponse={handleDataFromChild} />
                            <button className="z-10 absolute top-20 right-5 outline-none bg-secondary p-3 rounded-full shadow-lg shadow-dark">
                                <img src="assets/images/flash.svg" alt="" />
                            </button>
                        </MapComponent>
                        <MateContent
                            message={transcript}
                            responseTxt={cameraResponse}
                            setMap={handleDataMap}
                        />
                        <NavbarMobile />
                         <div
                            className={`absolute inset-0 flex items-end lg:items-center justify-center bg-black bg-opacity-20 z-50 
                                ${showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}
                                transition-all duration-2000 ease-in-out`}
                        >
                            <div className="bg-white gap-5 relative border-secondary border-t-[25px] p-4 rounded-t-xl shadow w-full lg:w-[40%] h-[20rem] lg:h-[30%] flex justify-center items-center flex-col">
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
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </>
    );
};

export default Assistant;
