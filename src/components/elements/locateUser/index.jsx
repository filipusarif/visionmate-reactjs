import { useState, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { supabase } from "../../../services/lib/supabaseClient";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

// Fungsi untuk instruksi suara
function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "id-ID";
    window.speechSynthesis.speak(speech);
}

const checkIfConnectionExists = async (id) => {
    if (!id) {
        console.warn("ID is null or undefined. Skipping connection check.");
        return false;
    }

    try {
        const { data, error } = await supabase
            .from("connections")
            .select("vi_id")
            .eq("vi_id", id);

        if (error) {
            console.error("Error checking connection:", error.message);
            return false;
        }
        return data && data.length > 0;
    } catch (error) {
        console.error("Unexpected error while checking connection:", error.message);
        return false;
    }
};

const updateDataLocation = async (id, lat, long) => {
    if (lat == null || long == null) {
        console.warn("Latitude atau Longitude kosong. Tidak dapat memperbarui lokasi.");
        return;
    }
    const { error } = await supabase
        .from("users")
        .update({ latitude: lat, longitude: long })
        .eq("id", id) 

    if (error) {
        console.error("Data gagal diupdate:", error.message);
    } else {
        console.log("Data berhasil diupdate untuk ID");
    }
};

export default function LocateUserAndRoute({ destination, audioEnabled, id, setStep, setDistance}) {
    const map = useMap();
    const routingControlRef = useRef(null);
    const [userPosition, setUserPosition] = useState(null);
    const [lastInstruction, setLastInstruction] = useState(null);
    const updateTimeoutRef = useRef(null);
    // Fungsi untuk menerjemahkan instruksi
function translateInstruction(instruction) {
    if (!instruction) return "";

    console.log(instruction);
    // Daftar pola instruksi dan terjemahannya
    const patterns = [
        { regex: /^Head west on (.+)$/, translation: "Mengarah ke barat $1" },
        { regex: /^Head north on (.+)$/, translation: "Mengarah ke utara $1" },
        { regex: /^Head east on (.+)$/, translation: "Mengarah ke timur $1" },
        { regex: /^Head south on (.+)$/, translation: "Mengarah ke selatan $1" },
        { regex: /^Turn left onto (.+)$/, translation: "Belok kiri menuju $1" },
        { regex: /^Turn right onto (.+)$/, translation: "Belok kanan menuju $1" },
        { regex: /^Continue onto (.+)$/, translation: "Lanjut lurus di $1" },
        { regex: /^Make a slight left onto (.+)$/, translation: "Belok sedikit ke kiri $1" },
        { regex: /^Make a slight right onto (.+)$/, translation: "Belok sedikit ke kanan $1" },
        { regex: /^Take the (.+) exit$/, translation: "Ambil keluar $1" },
        { regex: /^You have arrived at your destination, on the left (.+)$/, translation: "Kamu telah sampai ke tujuan, tujuan di sebelah kiri $1" },
        { regex: /^You have arrived at your destination, on the right (.+)$/, translation: "Kamu telah sampai ke tujuan, tujuan di sebelah kanan $1" },
    ];

    // Mencocokkan dan menerjemahkan berdasarkan pola
    for (const { regex, translation } of patterns) {
        const match = instruction.match(regex);
        if (match) {
            return instruction.replace(regex, translation);
        }
    }

    return instruction; // Jika tidak ada yang cocok, gunakan instruksi asli
}

useEffect(() => {
    const intervalId = setInterval(() => {
        const instructions = document.querySelector(".leaflet-routing-container");
        if (instructions) {
            instructions.style.display = "none"; 
        }
    }, 500); 

    return () => clearInterval(intervalId); 
}, []);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const newUserPosition = { lat: latitude, lng: longitude };
                setUserPosition(newUserPosition);

                // Batasi frekuensi update lokasi ke database
                if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
                updateTimeoutRef.current = setTimeout(async () => {
                    const exists = await checkIfConnectionExists(id);
                    if (exists) {
                        await updateDataLocation(id, latitude, longitude);
                    }
                }, 1000);

                // Update routing control
                if (!routingControlRef.current && destination.length === 2) {
                    routingControlRef.current = L.Routing.control({
                        waypoints: [
                            L.latLng(latitude, longitude),
                            L.latLng(...destination),
                        ],
                        router: L.Routing.osrmv1({
                            serviceUrl: "https://router.project-osrm.org/route/v1",
                            profile: "walking",
                        }),
                        routeWhileDragging: false,
                        lineOptions: {
                            styles: [{ color: "green", weight: 4 }],
                        },
                        addWaypoints: false,
                    })
                        .on("routesfound", (e) => {
                            const route = e.routes[0];
                            const instruction = route.instructions[0];
                            if (
                                instruction &&
                                instruction.text !== lastInstruction &&
                                audioEnabled
                            ) {
                                const translatedText = translateInstruction(instruction.text);
                                setLastInstruction(translatedText);
                                setStep(translatedText);
                                setDistance(instruction)
                                speak(
                                    `${instruction.distance} meter lagi, ${translatedText}`
                                );
                            }
                        })
                        .addTo(map);
                }

                if (routingControlRef.current) {
                    const waypoints = routingControlRef.current.getWaypoints();
                    waypoints[0] = L.Routing.waypoint(L.latLng(latitude, longitude));
                    routingControlRef.current.setWaypoints(waypoints);
                }

                map.flyTo([latitude, longitude], 18, { animate: true, duration: 2 });
            },
            (error) => {
                console.error("Error getting location", error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
                routingControlRef.current = null;
            }
        };
    }, [map, destination, audioEnabled, lastInstruction, id]);

    useEffect(() => {
        if (userPosition) {
            const userMarker = L.marker([userPosition.lat, userPosition.lng]).addTo(map);

            return () => {
                map.removeLayer(userMarker);
            };
        }
    }, [userPosition, map]);

    return null;
}

