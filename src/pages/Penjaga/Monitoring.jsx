import { useState, useEffect } from "react";
import MapMonitoring from "../../components/fragments/mapmonitoring";
import MonitoringContent from "../../components/fragments/monitoringcontent";
import useSession from "../../hooks/useSession";
import { UserAuth } from "../../components/context/AuthContext";
import { supabase } from "../../services/lib/supabaseClient";
import Navbar from "../../components/fragments/navbar";
import LoadingPage from "../LoadingPage";
import SidebarLayout from "../../components/layouts/Sidebar";
import NavbarMobile from "../../components/fragments/navbarmobile";



const Monitoring = () => {
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
                        users:vi_id (fullName, phone, latitude, longitude, photo, destination, position, duration, status, active)
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

    

    const [data, setData] = useState(null);
    
    useEffect(() => {
            const fetchUserData = async () => {
                if (userData?.id) {
                    try {
                        const { data, error } = await supabase
                            .from("users")
                            .select("id,phone, fullName, latitude, longitude, email, language, role, photo, duration, destination")
                            .eq("id", userData.id)
                            .single();
    
                        if (error) throw error;
                        // console.log(data)
                        setData(data);
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    }
                }
            };
    
            fetchUserData();
        }, [userData]);
    

    return (
        <section className="flex lg:flex-row bg-soft-background flex-col-reverse w-screen h-screen relative">
            {userData && data ? (
                <>
                    <SidebarLayout type={"guard"} userData={userData}/>
                    <div
                        className="flex lg:p-5 lg:flex-row gap-5 flex-col w-full h-full relative overflow-hidden"
                        >
                            <div className="lg:p-5 bg-background rounded-2xl flex lg:flex-col gap-2 flex-col w-full h-full relative overflow-hidden">
                                <p className="text-lg mb-0 lg:block hidden font-bold text-non-active text-center lg:text-start">Monitoring</p>
                                <div className="lg:p-0 bg-background rounded-xl flex lg:flex-row gap-5 flex-col-reverse w-full h-full relative overflow-hidden">
                                {/* <Navbar session={userData} mode="guard"/> */}
                                    <MonitoringContent setDestination={handleDestination} id={userData.id} data={data}  connections={connections}/>
                                    <MapMonitoring to={null} id={userData.id} connections={connections}  destination={destination}/>
                                </div>
                            </div>
                            <NavbarMobile type="guard"/>
                    </div>
                </>
            ) : (
                <LoadingPage />
            )}
        </section>
    )
}

export default Monitoring;