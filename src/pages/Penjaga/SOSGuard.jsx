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
import { Navigate } from "react-router-dom";


const SOSGuard = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [connections, setConnections] = useState([]);
    const [lastChats, setLastChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    // const [destination, setDestination] = useState([]);
    const [isCalling, setIsCalling] = useState(false);
    const navigate = useNavigate();

    useSession(decryptSession, setUserData);

    const handleDestination = (data) => {
        setDestination(data);
        
    }

    // Mendapatkan VI_id yang terhubung
    useEffect(() => {
        const fetchConnections = async () => {
            if (userData && userData.id) {
                const { data, error } = await supabase
                    .from("connections")
                    .select(`
                        vi_id,
                        users:vi_id (fullName, phone, latitude, longitude, photo, destination, duration, status)
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
        console.log("Fetching chat for VI:", vi_id);
        const { data: communications, error: commError } = await supabase
            .from("communications")
            .select("chat, created_at")
            .eq("id_user", vi_id)
            .order("created_at", { ascending: true });
    
        const { data: responses, error: respError } = await supabase
            .from("respons")
            .select("chat, created_at")
            .eq("vi_id", vi_id)
            .order("created_at", { ascending: true });
    
        if (commError || respError) {
            console.error("Error fetching chats:", commError || respError);
            return;
        }

        console.log("Communications:", communications);
        console.log("Responses:", responses);
    
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

        console.log("All messages:", allMessages);
    
        setSelectedChat({ vi_id, messages: allMessages });
    };
    
    
    
    const startCall = async (viId) => {
        setIsCalling(true);
        const { error } = await supabase.from("video_calls").insert([{ guard_id: userData.id, vi_id: viId, status: "pending" }]);
    
        if (error) {
            console.error("Error inserting call:", error.message);
            setIsCalling(false);
            return;
        }
    
        console.log("Call started for VI:", viId);
        navigate(`/guard/video-call/${viId}`);
    };

    return (
        <section className="flex md:flex-row bg-soft-background flex-col-reverse w-screen h-screen relative">
            {userData ? (
                <>
                    <Sidebar session={userData} >
                        <Link to={"/guard"}><SidebarItem text={"Monitoring"} icon={"/assets/images/sidebar/monitoring.svg"}/></Link>
                        <Link to={"/guard/sos"}><SidebarItem text={"SOS"} icon={"/assets/images/sidebar/sos-guard.svg"}/></Link>
                        <Link to={"/guard/scan"}><SidebarItem text={"Scan"} icon={"/assets/images/sidebar/scan.svg"}/></Link>
                        <Link to={"/guard/profile"}><SidebarItem text={"Profile"} icon={"/assets/images/sidebar/profile.svg"}/></Link>
                    </Sidebar>
                    <div
                        className="flex lg:p-5 md:flex-row gap-5 flex-col w-full h-full relative overflow-hidden"
                        >
                            <div className="lg:p-5 bg-background rounded-2xl flex md:flex-col gap-2 flex-col w-full h-full relative overflow-hidden">
                                <p className="text-lg mb-0 lg:block hidden font-bold text-non-active text-center lg:text-start">SOS</p>
                                {connections.length > 0 && (
                                    <button
                                        onClick={() => startCall(connections[0].vi_id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        📞 Call VI
                                    </button>
                                )}
                                <div className="lg:p-0 bg-background rounded-xl flex md:flex-row gap-5 flex-col-reverse w-full h-full relative overflow-hidden">
                                {/* <Navbar session={userData} mode="guard"/> */}
                                    <ChatContent setDestination={handleDestination} id={userData.id}  connections={connections} lastChats={lastChats} onSelectChat={fetchChatByUser}/>
                                    <Chat messages={selectedChat ? selectedChat.messages : []} />
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