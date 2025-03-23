import { useState, useEffect } from "react";
import MapMonitoring from "../../components/fragments/mapmonitoring";
import MonitoringContent from "../../components/fragments/monitoringcontent";
import useSession from "../../hooks/useSession";
import { UserAuth } from "../../components/context/AuthContext";
import { supabase } from "../../services/lib/supabaseClient";
import Navbar from "../../components/fragments/navbar";
import LoadingPage from "../LoadingPage";
import { Link } from "react-router-dom";
import Sidebar, { SidebarItem } from "../../components/fragments/sidebar";
import Chat from "../../components/layouts/Chat";
import ChatContent from "../../components/fragments/chatcontent";


const SOSGuard = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [connections, setConnections] = useState([]);
    const [destination, setDestination] = useState([]);

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
                                <div className="lg:p-0 bg-background rounded-xl flex md:flex-row gap-5 flex-col-reverse w-full h-full relative overflow-hidden">
                                {/* <Navbar session={userData} mode="guard"/> */}
                                    <ChatContent setDestination={handleDestination} id={userData.id}  connections={connections}/>
                                    <Chat />
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