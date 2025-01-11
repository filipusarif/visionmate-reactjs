import { useRef, useEffect, useState } from "react";
import MapMonitoring from "../../components/fragments/mapmonitoring";
import MonitoringContent from "../../components/fragments/monitoringcontent";
import { supabase } from "../../services/lib/supabaseClient";
import Cookies from 'js-cookie';


const Monitoring = () => {
    const [guardId, setGuardId] = useState(null);

    // Ambil ID user dari sesi login
    useEffect(() => {
        const savedSession = Cookies.get("userSession");
        if (savedSession) {
            try {
                const parsedSession = JSON.parse(savedSession);
                setGuardId(parsedSession.id); 
            } catch (error) {
                console.error("Error parsing session cookies:", error);
            }
        } else {
            console.warn("No session cookies found.");
        }
    }, []);

    useEffect(() => {
            const savedSession = Cookies.get("userSession");
            if (savedSession) {
                try {
                    const parsedSession = JSON.parse(savedSession);
                    setGuardId(parsedSession.id);
                } catch (error) {
                    console.error("Error parsing session cookies:", error);
                }
            } else {
                console.warn("No session cookies found.");
            }
        }, []);
    
    return (
        <section className="flex md:flex-row flex-col-reverse w-screen h-screen relative">
            <MonitoringContent id={guardId}/>
            <MapMonitoring to={null} id={guardId}/>
        </section>
    )
}

export default Monitoring;