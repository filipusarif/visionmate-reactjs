import NavbarMobile from "../components/fragments/navbarmobile";
import { UserAuth } from "../components/context/AuthContext";
import useSession from "../hooks/useSession";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../services/lib/supabaseClient";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import Footer from "../components/fragments/footer";
import Back from "../components/elements/back";
import Navbar from "../components/fragments/navbar";
import chat from "../services/api/chat";
import Popup from "../components/elements/popup";
import SidebarLayout from "../components/layouts/Sidebar";
import IncomingCall from "../components/elements/call";

export default function Profile(){
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    const isFirstRender = useRef(true);
    const [guards, setGuards] = useState([]);

    useEffect(() => {
            if (isFirstRender.current) {
                window.speechSynthesis.cancel();
                isFirstRender.current = false;
            
                // Pesan sapaan awal
                const initialMessage = "Halo mate, kamu di halaman profile sekarang!";
            
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

    const [data, setData] = useState(null);

    useEffect(() => {
            const fetchUserData = async () => {
                if (userData?.id) {
                    try {
                        const { data, error } = await supabase
                            .from("users")
                            .select("id,phone, fullName, email, language, role, photo, duration, destination")
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

        const slides = [
            {
                title: "Nama Lengkap",
                icon: "/assets/images/profile/icon1.svg",
                content: data?.fullName,
            },
            {
                title: "Alamat Email",
                icon: "/assets/images/profile/icon2.svg",
                content: data?.email,
            },
            {
                title: "No. Telephone",
                icon: "/assets/images/profile/icon3.svg",
                content:data?.phone,
            },
            {
                title: "Penjaga",
                icon: "/assets/images/profile/icon4.svg",
                content: guards?.length > 0
                ? guards.map((guard, index) => (
                      <div key={index} className="flex flex-row gap-3  items-center">
                          <p className="font-semibold">{guard.fullName}</p>
                          <p className="text-sm text-gray-600">({guard.phone})</p>
                      </div>
                  ))
                : "Tidak ada penjaga terhubung",
            },

        ];


        useEffect(() => {
            const fetchGuards = async () => {
                if (userData?.id) {
                    try {
                        // Query data penjaga yang terhubung
                        const { data, error } = await supabase
                            .from("connections")
                            .select(`
                                guard_id (
                                    fullName,
                                    phone
                                )
                            `)
                            .eq("vi_id", userData.id);

                        if (error) throw error;

                        // Extract daftar penjaga
                        const guardList = data.map((connection) => connection.guard_id);
                        setGuards(guardList);
                    } catch (error) {
                        console.error("Error fetching guards:", error);
                    }
                }
            };

            fetchGuards();
        }, [userData]);


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
                {data ? (
                    <>
                        <IncomingCall viId={data.id}/>
                        <div className='bg-gray-50 w-screen relative h-screen overflow-hidden lg:flex' 
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}>
                            {/* <Navbar session={userData} mode="vi" /> */}
                            <SidebarLayout type={"vi"} userData={userData}/>
                            <NavbarMobile />
                            
                            <section className="w-screen min-h-screen overflow-y-scroll flex flex-col gap-6 bg-background"
                            >
                                <div className="bg-secondary pb-10 lg:pt-10 rounded-b-3xl ">
                                    <div className="container mx-auto flex flex-col gap-8">
                                    <Back title={"PROFILE"}  to={"/vi"}/>

            
                                    <div className="flex flex-col justify-center items-center gap-4">
                                        <img 
                                            src={data.photo} 
                                            alt="Profile" 
                                            className="w-32 h-32 border-4 border-gray-100 object-cover rounded-full shadow-lg" 
                                        />
                                        <div className="text-center">
                                            <h1 className="font-bold text-xl text-gray-100">{data.fullName}</h1>
                                            <p className="font-medium text-base text-gray-200">
                                                {data.role === "VI" ? "Visual Impairment" : "Guard"}
                                            </p>
                                            <p className="text-sm text-gray-300">#{data.id}</p>
                                        </div>
                                        </div>

                                    </div>
            
                                    <div className="flex justify-between items-center gap-8">
                                        <div className="basis-1/2 flex flex-col justify-center items-center">
                                            <h1 className="text-lg font-bold text-gray-100">3.14 KM</h1>
                                            <p className="text-sm text-gray-200">Jarak</p>
                                        </div>
                                        <div className="basis-1/2 flex flex-col justify-center items-center">
                                            <h1 className="text-lg font-bold text-gray-100">00:00:20</h1>
                                            <p className="text-sm text-gray-200">Waktu Aktif</p>
                                        </div>
                                    </div>
                                </div>
            
                                <main className="container mx-auto flex flex-col gap-4 w-full px-6 pb-20">
                                    {slides.map((slide, index) => (
                                        <div 
                                            key={index} 
                                            className="w-full flex gap-4 items-center py-4 border-b border-gray-300">
                                            <img 
                                                src={slide.icon} 
                                                alt="Icon" 
                                                className="w-7 h-7" 
                                            />
                                            {slide.content === "penjaga" ? (
                                                <>
                                                    {Array.isArray(slide.content) ? (
                                                        <div className="flex flex-col gap-2">
                                                            {slide.content.map((content, idx) => (
                                                                <div key={idx}>{content}</div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-gray-600">{slide.content}</p>
                                                    )}
                                                </>
                                            ):(
                                                <div>
                                                    <h1 className="text-sm font-semibold text-gray-800">{slide.title}</h1>
                                                    <p className="text-xs text-gray-600">{slide.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </main>
                            </section>
                            {/* <div className="hidden lg:block">
                                <Footer />
                            </div> */}
                            <Popup text="Halo Mate, mau pindah halaman?" showPopup={showPopup} isListening={isListening} />
                            
                        </div>
                    </>
                ) : (
                    <LoadingPage />
                )}
            </>
        );
}