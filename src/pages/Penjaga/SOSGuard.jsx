import { useState, useEffect } from "react";
import MapMonitoring from "../../components/fragments/mapmonitoring";
import MonitoringContent from "../../components/fragments/monitoringcontent";
import useSession from "../../hooks/useSession";
import { UserAuth } from "../../components/context/AuthContext";
import { supabase } from "../../services/lib/supabaseClient";
import Navbar from "../../components/fragments/navbar";
import LoadingPage from "../LoadingPage";
import { Link, useNavigate } from "react-router-dom";
import Sidebar, { SidebarItem } from "../../components/fragments/sidebar";
import Chat from "../../components/layouts/Chat";
import ChatContent from "../../components/fragments/chatcontent";
import zgEngine from "../../services/lib/zegocloud";
import NavbarMobile from "../../components/fragments/navbarmobile";



const SOSGuard = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [connections, setConnections] = useState([]);
    const [lastChats, setLastChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    // const [destination, setDestination] = useState([]);
    const [isCalling, setIsCalling] = useState(false);
    const [roomID, setRoomId] = useState(null);
    const [page, setPage] = useState(false);
    const navigate = useNavigate();

    useSession(decryptSession, setUserData);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("id,phone, fullName, email, language, role, photo, duration, destination")
                    .eq("id", userData?.id)
                    .single();

                if (error) throw error;
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userData?.id) {
            fetchUserData();
        }
    }, [userData?.id]);

    const handleDestination = (data) => {
        setDestination(data);
        
    }

    useEffect(() => {
        setRoomId(randomID(10));
    },[])

    // Mendapatkan VI_id yang terhubung
    useEffect(() => {
        const fetchConnections = async () => {
            if (userData && userData.id) {
                const { data, error } = await supabase
                    .from("connections")
                    .select(`
                        vi_id,
                        users:vi_id (fullName, phone, latitude, longitude, photo, destination, duration, status, active)
                    `)
                    .eq("guard_id", userData.id);
    
                if (error) {
                    console.error("Error fetching connections:", error.message);
                } else {
                    setConnections(data);
                }
            }
        };
    
        fetchConnections();
    }, [userData]);

    useEffect(() => {
        const fetchLastChats = async () => {
            if (userData && userData.id) {
                const { data, error } = await supabase
                    .from("communications")
                    .select("id_user, chat, created_at")
                    .order("created_at", { ascending: false }) 
                    .limit(1);
        
                if (error) {
                    console.error("Error fetching last chats:", error.message);
                } else {
                    // Konversi ke WIB (UTC+7) dan ambil jam & menit saja
                    const convertedData = data.map(item => {
                        const date = new Date(item.created_at);
                        date.setHours(date.getHours() + 7); // Konversi ke WIB
                        
                        // Format: "HH:mm" (contoh: "14:30")
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        return {
                            ...item,
                            created_at: `${hours}:${minutes}`
                        };
                    });
                    setLastChats(convertedData);
                }
            }
        };
    
        fetchLastChats();
    }, [userData]);


    const fetchChatByUser = async (vi_id) => {

        // console.log("Fetching chat for VI:", vi_id);
        const { data: communications, error: commError } = await supabase
            .from("communications")
            .select("chat, created_at")
            .eq("id_user", vi_id)
            .order("created_at", { ascending: true });
    
        const { data: responses, error: respError } = await supabase
            .from("respons")
            .select("chat, created_at")
            .eq("vi_id", vi_id)
            .eq("guard_email", userData.email)
            .order("created_at", { ascending: true });

        const { data: userInfo, error: userError } = await supabase
        .from("users")
        .select("fullName, phone, latitude, longitude, photo, destination, duration, status")
        .eq("id", vi_id)
        .single();
        
    
        if (commError || respError || userError) {
            console.error("Error fetching chats:", commError || respError || userError);
            return;
        }
    
        // Tandai asal pesan
        const formattedCommunications = communications.map(msg => ({
            ...msg,
            sender: "other" // Pesan dari pengguna lain
        }));
    
        const formattedResponses = responses.map(msg => ({
            ...msg,
            sender: "self" // Pesan dari sistem atau admin
        }));
    
        // Gabungkan dan urutkan berdasarkan waktu
        const allMessages = [...formattedCommunications, ...formattedResponses].sort((a, b) => 
            new Date(a.created_at) - new Date(b.created_at)
        );

        setSelectedChat({ vi_id, messages: allMessages, userInfo: userInfo });
        setPage(true);
    };
    
    useEffect(() => {
        // Inisialisasi SDK saat komponen dimuat
        // console.log("zgEngine:", zgEngine);
        // console.log("Available methods:", Object.keys(zgEngine));

        zgEngine
    }, []);

    function randomID(len) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
            maxPos = chars.length,
            i;
        len = len || 5;
        for (i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }
    
    const startCall = async (viId) => {
        setIsCalling(true);
        const { error } = await supabase.from("video_calls").insert([{ guard_id: userData.id, vi_id: viId, status: "pending", room_id: roomID, from: userData.fullName }]);
        if (error) {
            console.error("Error inserting call:", error.message);
            setIsCalling(false);
            return;
        }
        navigate(`/careyou/?roomID=${roomID}`);
    };

    const handleNewMessage = (newMessage) => {
        setSelectedChat(prev => {
            if (!prev) return null;
            
            return {
                ...prev,
                messages: [...prev.messages, newMessage]
            };
        });
    };

    const handleSetPage = (data) => {
        setPage(data);
    }

    return (
        <section className="flex lg:flex-row bg-soft-background flex-col-reverse w-screen h-screen relative">
            {userData ? (
                <>
                    <Sidebar session={userData} >
                        <Link to={"/guard"}><SidebarItem text={"Monitoring"} icon={"/assets/images/sidebar/monitoring.svg"}/></Link>
                        <Link to={"/guard/sos"}><SidebarItem text={"HelpMe"} icon={"/assets/images/sidebar/sos-guard.svg"}/></Link>
                        <Link to={"/guard/scan"}><SidebarItem text={"Scan"} icon={"/assets/images/sidebar/scan.svg"}/></Link>
                        <Link to={"/guard/profile"}><SidebarItem text={"Profile"} icon={"/assets/images/sidebar/profile.svg"}/></Link>
                    </Sidebar>
                    <NavbarMobile type="guard"/>
                    <div
                        className="flex lg:p-5 lg:flex-row gap-5 flex-col w-full h-full relative overflow-hidden"
                        >
                            <div className="lg:p-5 bg-background rounded-2xl flex lg:flex-col gap-2 flex-col w-full h-full relative overflow-hidden">
                                <p className="text-lg mb-0 lg:block hidden font-bold text-non-active text-center lg:text-start">HelpMe</p>
                                <div className="block lg:hidden w-full h-full">
                                    {page ? (
                                        <Chat messages={selectedChat ? selectedChat.messages : []} userInfo={selectedChat ? selectedChat.userInfo : null} vi_id={selectedChat?.vi_id} guard_email={userData?.email} onNewMessage={handleNewMessage} startCall={startCall} setPage={handleSetPage}/>
                                    ):(
                                        <ChatContent setDestination={handleDestination} id={userData.id}  connections={connections} lastChats={lastChats} onSelectChat={fetchChatByUser} />
                                    )}
                                </div>
                                <div className="lg:p-0 hidden bg-background rounded-xl lg:flex lg:flex-row gap-5 flex-col-reverse w-full h-full relative overflow-hidden">
                                {/* <Navbar session={userData} mode="guard"/> */}
                                    <ChatContent setDestination={handleDestination} id={userData.id}  connections={connections} lastChats={lastChats} onSelectChat={fetchChatByUser} />
                                    <Chat messages={selectedChat ? selectedChat.messages : []} userInfo={selectedChat ? selectedChat.userInfo : null} vi_id={selectedChat?.vi_id} guard_email={userData?.email} onNewMessage={handleNewMessage} startCall={startCall} setPage={handleSetPage}/>
                                </div>
                            </div>
                    </div>
                </>
            ) : (
                <LoadingPage />
            )}
        </section>
    )
}

export default SOSGuard;