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
        console.log(data)
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
        .from("connections")
        .update({ latitude: lat, longitude: long })
        .eq("vi_id", id) 

    if (error) {
        console.error("Data gagal diupdate:", error.message);
    } else {
        console.log("Data berhasil diupdate untuk ID:");
    }
};

export default function LocateUserAndRoute({ destination, audioEnabled, id }) {
    const map = useMap();
    const routingControlRef = useRef(null);
    const [userPosition, setUserPosition] = useState(null);
    const [lastInstruction, setLastInstruction] = useState(null);
    const updateTimeoutRef = useRef(null);

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
                    console.log("ada",exists)
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
                                setLastInstruction(instruction.text);
                                speak(
                                    `${instruction.distance} meter lagi, ${instruction.text}`
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

