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






export default function LocateUserAndRouteMonitoring({ destination, audioEnabled, id, connections}) {
    const map = useMap();
    const routingControlRef = useRef(null);
    const [userPosition, setUserPosition] = useState(null);
    const [lastInstruction, setLastInstruction] = useState(null);
    const updateTimeoutRef = useRef(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        console.log("con", connections)
    }, [connections])

    const handleMarkerClick = (lat, lng) => {
        if (!routingControlRef.current) {
            // Jika routing control belum ada, buat kontrol baru
            routingControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(userPosition.lat, userPosition.lng), // Titik awal
                    L.latLng(lat, lng), // Titik tujuan
                ],
                router: L.Routing.osrmv1({
                    serviceUrl: "https://router.project-osrm.org/route/v1",
                    profile: "walking", // Menggunakan profil "walking"
                }),
                routeWhileDragging: true, // Izinkan pengguna menyeret rute
                lineOptions: {
                    styles: [{ color: "blue", weight: 4 }], // Gaya rute
                },
                addWaypoints: false, // Nonaktifkan penambahan waypoints manual
                
            }).addTo(map);
        } else {
            // Jika routing control sudah ada, update titik tujuan
            routingControlRef.current.setWaypoints([
                L.latLng(userPosition.lat, userPosition.lng), // Posisi pengguna
                L.latLng(lat, lng), // Titik tujuan
            ]);
        }
    };

    // Fetch user name for each connection
    const getUserName = async (vi_id) => {
        try {
            const { data, error } = await supabase
                .from("auth.users") // Mengambil data dari tabel auth.users
                .select("id, raw_user_meta_data") // Sertakan kolom raw_user_meta_data
                .eq("id", vi_id);
    
            if (error) {
                console.error("Error fetching user name:", error.message);
                return null;
            }
    
            if (data && data.length > 0) {
                const metaData = data[0].raw_user_meta_data;
                const userName = metaData && metaData.name ? metaData.name : "Unknown User"; // Pastikan properti yang diambil sesuai dengan struktur JSON
                return userName;
            }
    
            return "Unknown User";
        } catch (error) {
            console.error("Unexpected error while fetching user name:", error.message);
            return null;
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Cari elemen DOM yang dibuat oleh Leaflet Routing Machine
            const instructions = document.querySelector(".leaflet-routing-container");
            if (instructions) {
                instructions.style.display = "none"; // Sembunyikan elemen instruksi
            }
        }, 500); // Periksa setiap 500ms untuk memastikan elemen hilang
    
        return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
    }, []);
    

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const newUserPosition = { lat: latitude, lng: longitude };
                setUserPosition(newUserPosition);

                // // Batasi frekuensi update lokasi ke database
                // if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
                // updateTimeoutRef.current = setTimeout(async () => {
                //     const exists = await checkIfConnectionExists(id);
                //     console.log("ada",exists)
                //     if (exists) {
                //         await updateDataLocation(id, latitude, longitude);
                //     }
                // }, 1000);

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

    // Add markers for each connection
    useEffect(() => {
        const addConnectionMarkers = async () => {
            markers.forEach(marker => map.removeLayer(marker));
        
            const newMarkers = [];
            for (const connection of connections) {
                // const userName = connection.vi_id; // Anda bisa mengganti dengan nama user sebenarnya
                const userName = getUserName(connection.vi_id); // Anda bisa mengganti dengan 
                // nama user sebenarnya
                console.log(userName);
                const marker = L.marker([connection.latitude, connection.longitude])
                    .addTo(map)
                    .bindTooltip(`<strong>${userName}</strong>`, { permanent: true, direction:"top" })
                    .on("click", () => handleMarkerClick(connection.latitude, connection.longitude)); // Tambahkan event klik
        
                newMarkers.push(marker);
            }
        
            setMarkers(newMarkers);
        };
        

        // Set up an interval to fetch and update markers setiap 3 detik
        const intervalId = setInterval(() => {
            if (connections.length > 0) {
                addConnectionMarkers();
            }
        }, 3000); // 3000ms = 3 detik

        // Cleanup interval ketika komponen di-unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [connections, map, markers]);


    return null;
}

