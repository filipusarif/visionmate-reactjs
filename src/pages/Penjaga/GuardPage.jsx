import NavbarMobile from "../../components/fragments/navbarmobile";
import { UserAuth } from "../../components/context/AuthContext";
import useSession from "../../hooks/useSession";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../../services/lib/supabaseClient";
import LoadingPage from "./../LoadingPage";
import { Link } from "react-router-dom";
import Footer from "../../components/fragments/footer";
import Back from "../../components/elements/back";
import Navbar from "../../components/fragments/navbar";
import chat from "../../services/api/chat";
import Popup from "../../components/elements/popup";
import SidebarLayout from "../../components/layouts/Sidebar";
import IncomingCall from "../../components/elements/call";

export default function GuardProfile(){
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    const isFirstRender = useRef(true);
    const [guards, setGuards] = useState([]);

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
            // {
            //     title: "Penjaga",
            //     icon: "/assets/images/profile/icon4.svg",
            //     content: guards?.length > 0
            //     ? guards.map((guard, index) => (
            //           <div key={index} className="flex flex-row gap-3  items-center">
            //               <p className="font-semibold">{guard.fullName}</p>
            //               <p className="text-sm text-gray-600">({guard.phone})</p>
            //           </div>
            //       ))
            //     : "Tidak ada penjaga terhubung",
            // },

        ];


        useEffect(() => {
            const fetchGuards = async () => {
                if (userData?.id) {
                    try {
                        // Query data penjaga yang terhubung
                        const { data, error } = await supabase
                            .from("connections")
                            .select(`
                                vi_id (
                                    fullName,
                                    phone,
                                    photo
                                )
                            `)
                            .eq("guard_id", userData.id);

                        if (error) throw error;

                        // Extract daftar penjaga
                        const guardList = data.map((connection) => connection.vi_id);
                        console.log(data)
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

        return (
            <>
                {data && userData && guards ? (
                    <>
                        <IncomingCall viId={data.id}/>
                        <div className='bg-soft-background w-screen relative h-screen overflow-hidden lg:flex' 
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}>
                            {/* <Navbar session={userData} mode="vi" /> */}
                            <SidebarLayout type={"guard"} userData={userData}/>
                            <NavbarMobile type="guard"/>
                            <div
                            className="flex lg:p-5 lg:flex-row-reverse gap-5 flex-col w-full h-full relative overflow-hidden"
                            >
                                <div className="lg:p-5  bg-background lg:rounded-2xl flex lg:flex-col gap-2 flex-col w-full h-full relative overflow-hidden">
                                    <p className="text-lg mb-0 font-bold text-non-active text-center lg:text-start hidden lg:block">Profile</p>
                                    <section className="w-full h-full overflow-auto flex flex-col gap-6 bg-background"
                                    >
                                        <div className="from-secondary to-70% to-primary bg-gradient-to-bl  py-5 shadow-md  rounded-b-3xl relative overflow-hidden">
                                            <img className="absolute left-0 -bottom-32 w-32 opacity-70 lg:w-auto lg:-bottom-80 z-0 lg:opacity-25" src="/assets/images/Ellipsekiri.svg" alt="" />
                                            <img className="absolute right-0 bottom-0 z-0 opacity-30" src="/assets/images/Ellipsekanan.svg" alt="" />
                                            <div className="container mx-auto flex flex-col gap-8 pt-10 lg:pt-0 ">
                                                <div className="flex flex-col justify-center items-center gap-2 ">
                                                    <div className="relative">
                                                        <img 
                                                        src={data.photo} 
                                                        alt="Profile" 
                                                        className="w-32 h-32 border-2 border-gray-300 object-cover rounded-full shadow-lg" 
                                                        />
                                                        <Link to={"/vi/profile"} className="absolute right-0 bottom-0"><img src="/assets/images/sidebar/nav.svg" alt=""  className="p-2 w-10 bg-white rounded-full"/></Link>
                                                    </div>
                                                    <div className="text-center flex-col gap-0 flex">
                                                        <h1 className="font-bold text-2xl text-gray-100">{data.fullName}</h1>
                                                        <div className="flex gap-1 items-center justify-content-center">
                                                            <p className="font-medium text-lg text-gray-200">
                                                                {data.role === "VI" ? "Visual Impairment" : "Guard"}
                                                            </p>
                                                            <p className="text-lg text-gray-300">#{data.id}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full px-4 z-50 block lg:hidden'>
                                            <Back title={"Profile"} to={"/vi"} />
                                        </div>
                                        <main className="lg:container lg:mx-auto flex flex-col lg:flex-row gap-0 lg:gap-4 w-full px-6 ">
                                            {slides.map((slide, index) => (
                                                <div 
                                                    key={index} 
                                                    className="w-full lg:basis-1/3 flex gap-4 items-center p-4 rounded-lg lg:shadow-md">
                                                    <img 
                                                        src={slide.icon} 
                                                        alt="Icon" 
                                                        className="w-7 h-7" 
                                                    />
                                                    {slide.content === "vi" ? (
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
                                                        <div className="flex flex-col gap-0">
                                                            <h1 className="text-xs font-base text-gray-600">{slide.title}</h1>
                                                            <p className="text-lg font-medium text-gray-800">{slide.content}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </main>
                                        <main className="lg:container mx-auto flex flex-col gap-4 w-full px-6">
                                            <h1 className="font-bold text-lg text-non-active">Pengguna VI Terhubung</h1>
                                            <div className="w-full flex-col items-center">
                                            {guards?.length > 0
                                            ? guards.map((guard, index) => (
                                                <div key={index} className="w-full flex flex-row gap-5 items-center border-gray-300 p-3 border-b-[1px] hover:bg-gray-100">
                                                    <img src={guard.photo} alt="" className="w-14 h-12 rounded-full object-cover "/>
                                                    <div className="w-full">
                                                        <p className="font-semibold text-lg">{guard.fullName}</p>
                                                        <p className="text-sm text-gray-600 flex gap-1 items-center"><img src="/assets/images/profile/icon3.svg" alt="" className="w-5"/> ({guard.phone})</p>
                                                    </div>
                                                    <p className="text-[14px] font-semibold px-2 rounded-md py-1 h-fit bg-[#1EC198] bg-opacity-20 text-[#1EC198]">Walking</p>
                                                </div>
                                            ))
                                            : (
                                                <p>Tidak ada Pengguna VI Terhubung</p>
                                            )}
                                            </div>
                                        </main>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <LoadingPage />
                )}
            </>
        );
}