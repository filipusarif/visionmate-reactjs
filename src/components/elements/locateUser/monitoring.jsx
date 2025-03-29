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
            .select("guard_id")
            .eq("guard_id", id);

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
    const [photo, setPhoto] =useState([]);

    const userIcon = L.icon({
        iconUrl:"/assets/images/transparent.png", 
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    const handleMarkerClick = (lat, lng) => {
        if (!routingControlRef.current) {
            // Jika routing control belum ada, buat kontrol baru
            routingControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(userPosition.lat, userPosition.lng), 
                    L.latLng(lat, lng), //titik tujuan
                ],
                router: L.Routing.osrmv1({
                    serviceUrl: "https://router.project-osrm.org/route/v1",
                    profile: "walking", 
                }),
                routeWhileDragging: true, 
                lineOptions: {
                    styles: [{ color: "blue", weight: 4 }], 
                },
                addWaypoints: false, 
                createMarker: (i, waypoint, n) => {
                    // Gunakan ikon kustom
                    return L.marker(waypoint.latLng, {
                        icon:  userIcon, // User marker atau tujuan marker
                    });
                },
                
            }).addTo(map);
        } else {
            
            routingControlRef.current.setWaypoints([
                L.latLng(userPosition.lat, userPosition.lng), 
                L.latLng(lat, lng), 
            ]);
        }

         // Hapus marker sebelumnya yang ada pada map jika ada
        markers.forEach(marker => {
            map.removeLayer(marker); 
        });

    };


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

                // // Batasi frekuensi update lokasi ke database
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
                            styles: [{ color: "blue", weight: 4 }],
                        },
                        addWaypoints: false,
                        createMarker: (i, waypoint, n) => {
                            // Gunakan ikon kustom
                            return L.marker(waypoint.latLng, {
                                icon: i === 0 ? userIcon : destinationIcon, // User marker atau tujuan marker
                            });
                        },
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
        if (userPosition && photo && photo.length > 0) {
            const userMarkerIcon = L.icon({
                iconUrl: photo[0].photo, 
                iconSize: [32, 32], // Ukuran marker
                iconAnchor: [16, 32], // Titik anchor
                popupAnchor: [0, -32], // Lokasi pop-up
                className: 'rounded-full border-secondary border-2' ,
            });
            const userMarker = L.marker([userPosition.lat, userPosition.lng], { icon: userMarkerIcon })
            .addTo(map)
            .bindTooltip(`<strong>Saya</strong>`, { permanent: true, direction:"top",offset: [0, -32]  })
            ;

            return () => {
                map.removeLayer(userMarker);
            };
        }
    }, [userPosition, map]);

    useEffect(() => {
        const fetchConnections = async () => {
            const { data, error } = await supabase
                .from("users")
                .select(`
                    photo
                `)
                .eq("id", id);

            if (error) {
                console.error("Error fetching connections:", error.message);
            } else {
                setPhoto(data);
            }

        };
    
        fetchConnections();
    }, [id]);

    // Add markers for each connection
    useEffect(() => {
        const addConnectionMarkers = async () => {
            markers.forEach(marker => map.removeLayer(marker));
        
            const newMarkers = [];
            for (const connection of connections) {
                const userMarkerIcon = L.icon({
                    iconUrl: connection.users.photo, 
                    iconSize: [40, 40], // Ukuran marker
                    iconAnchor: [16, 32], // Titik anchor
                    popupAnchor: [0, -32], // Lokasi pop-up
                    className: 'rounded-full border-secondary border-2' ,
                });

                const marker = L.marker([connection.users.latitude, connection.users.longitude], { icon: userMarkerIcon })
                    .addTo(map)
                    .bindTooltip(`<strong>${connection.users.fullName}</strong>`, { permanent: true, direction:"top",offset: [0, -32]  })
                    .on("click", () => handleMarkerClick(connection.users.latitude, connection.users.longitude)); // Tambahkan event klik
        
                newMarkers.push(marker);
            }
        
            setMarkers(newMarkers);
        };
        

        const intervalId = setInterval(() => {
            if (connections.length > 0) {
                addConnectionMarkers();
            }
        }, 3000); 

        return () => {
            clearInterval(intervalId);
        };
    }, [connections, map, markers]);

    return null;
}

