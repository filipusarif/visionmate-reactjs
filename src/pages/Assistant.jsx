import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../components/fragments/map";
import Camera from "../components/fragments/camera";
import MateContent from "../components/fragments/matecontent";

const Assistant = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [cameraResponse, setCameraResponse] = useState(""); // Tambahkan state untuk menyimpan response
    const pressTimer = useRef(null);
    const closeTimer = useRef(null);
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = "id-ID"; // Bahasa Indonesia

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


    // Fungsi untuk menerima data dari child
    const handleDataFromChild = (data) => {
        // setDataFromChild(data);
        setCameraResponse(data);
        console.log('Data dari Child:', data);
    };

    useEffect(()=>{
        console.log("camera ini ",cameraResponse)
    }, [cameraResponse])

    return (
        <section
            className="flex w-screen h-screen relative"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            <MapComponent />
            <Camera setCameraResponse={handleDataFromChild} /> {/* Kirim handler ke Camera */}
            <MateContent message={transcript} responseTxt={cameraResponse} /> {/* Kirim response ke MateContent */}
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow w-[40%] h-[30%] flex justify-center items-center flex-col">
                        <p>Halo Mate, Ada apa?</p>
                        <p>{isListening && "Mendengarkan..."}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Assistant;
