import { useState, useEffect } from "react";
import MapMonitoring from "../../components/fragments/mapmonitoring";
import MonitoringContent from "../../components/fragments/monitoringcontent";
import useSession from "../../hooks/useSession";
import { UserAuth } from "../../components/context/AuthContext";
import { supabase } from "../../services/lib/supabaseClient";
import Navbar from "../../components/fragments/navbar";


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
        <section className="flex md:flex-row flex-col-reverse w-screen h-screen relative">
            {userData ? (
                <>
                    <Navbar session={userData} mode="guard"/>
                    <MonitoringContent setDestination={handleDestination} id={userData.id}  connections={connections}/>
                    <MapMonitoring to={null} id={userData.id} connections={connections}  destination={destination}/>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    )
}

export default Monitoring;