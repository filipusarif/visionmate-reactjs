import { supabase } from "../lib/supabaseClient";

const sosChat = async (value, id, user) => {
    try {
        const { data, error } = await supabase
            .from("connections")
            .select(`
                guard_id,
                users:guard_id (fullName, phone, latitude, longitude, photo, destination, duration, status)
            `)
            .eq("vi_id", id);
        console.log("lewatt")
        if (error) {
            console.error("Error fetching connections:", error.message);
            return null;
        }

        console.log("Data retrieved:", data);

        if (data && data.length > 0) {
            // Prepare and insert each record into the communications table
            const communicationData = data.map(record => {
                const { guard_id, users } = record;
                const { phone, latitude, longitude } = users;

                // Get current time in UTC+7 (Indonesia Standard Time)
                const now = new Date();
                const offset = 7 * 60; // UTC+7 offset in minutes
                const localTime = new Date(now.getTime() + offset * 60 * 1000);
                
                return {
                    id_user: id,
                    number: phone,
                    chat: value, // Assuming `value` contains the chat message
                    status: false, // Setting status as true by default
                    time: localTime.toISOString().replace('T', ' ').replace('Z', '+07:00'),
                    created_at: localTime.toISOString().replace('T', ' ').replace('Z', '+07:00'),
                    latitude: user.latitude,
                    longitude: user.longitude,
                };
            });

            // Insert all records into the communications table
            const { data: commData, error: commError } = await supabase
                .from("communications")
                .insert(communicationData);

            if (commError) {
                console.error("Error inserting into communications:", commError.message);
                return null;
            }

            console.log("Data inserted into communications:", commData);
            // return commData;
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
}

export default sosChat;