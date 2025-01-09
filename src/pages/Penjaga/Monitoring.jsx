import { useRef, useEffect, useState } from "react";
import MapMonitoring from "../../components/fragments/mapmonitoring";
import MonitoringContent from "../../components/fragments/monitoringcontent";
import { supabase } from "../../services/lib/supabaseClient";

const Monitoring = () => {
    const [guardId, setGuardId] = useState();
    // Ambil ID guard dari sesi login
    useEffect(() => {
        const fetchGuardId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
            } else if (data?.session?.user?.id) {
                setGuardId(data.session.user.id);
            } else {
                console.warn("No active session found.");
            }
        };
        fetchGuardId();
    }, []);
    
    return (
        <section className="flex md:flex-row flex-col-reverse w-screen h-screen relative">
            <MonitoringContent id={guardId}/>
            <MapMonitoring to={null} id={guardId}/>
        </section>
    )
}

export default Monitoring;