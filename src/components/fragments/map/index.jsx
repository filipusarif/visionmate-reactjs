import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

// Komponen untuk menemukan lokasi dan menampilkan rute
function LocateUserAndRoute({ destination }) {
    const map = useMap();
    const routingControlRef = useRef(null);
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newUserPosition = { lat: latitude, lng: longitude };
                setUserPosition(newUserPosition);

                console.log(userPosition);
                console.log("New Position:", position.coords);
                // Jika kontrol rute belum ada, buat kontrol rute baru
                if (!routingControlRef.current && destination.length === 2) {
                    routingControlRef.current = L.Routing.control({
                        waypoints: [
                            L.latLng(latitude, longitude), // Lokasi awal pengguna
                            L.latLng(...destination), // Tujuan
                        ],
                        router: L.Routing.osrmv1({
                            serviceUrl: "https://router.project-osrm.org/route/v1",
                            profile: "walking",
                        }),
                        routeWhileDragging: false,
                        lineOptions: {
                            styles: [{ color: "green", weight: 4 }],
                        },
                        addWaypoints: false, // Mencegah pengguna menambah waypoint manual
                    }).addTo(map);
                }

                // Jika kontrol rute sudah ada, perbarui hanya lokasi pengguna
                if (routingControlRef.current) {
                    const waypoints = routingControlRef.current.getWaypoints();
                    waypoints[0] = L.Routing.waypoint(L.latLng(latitude, longitude)); // Perbarui lokasi pengguna
                    routingControlRef.current.setWaypoints(waypoints); // Set waypoints tanpa merender ulang
                }

                // Transisi halus ke posisi pengguna
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
    }, [map, destination]);

    useEffect(() => {
        if (userPosition) {
            const userMarker = L.marker([userPosition.lat, userPosition.lng], {
                // icon: L.icon({
                //     iconUrl: "https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color-thumbnail.png",
                //     iconSize: [30, 30],
                // }),
            }).addTo(map);
    
            return () => {
                map.removeLayer(userMarker); // Hapus marker lama
            };
        }
    }, [userPosition, map]);

    return null;
}


const MapComponent = ({ to }) => {
    const [destination, setDestination] = useState([]);
    const [placeName, setPlaceName] = useState("");

    useEffect(() => {
        if (to) {
            setPlaceName(to);
        }
    }, [to]);

    useEffect(() => {
        if (placeName.trim()) {
            handleSearch();
        }
    }, [placeName]);

    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    placeName
                )}&format=json`
            );
            const data = await response.json();
            setLoading(false);

            if (data.length === 0) {
                alert("Tempat tidak ditemukan, coba nama lain.");
                return;
            }

            const { lat, lon } = data[0];
            setDestination([parseFloat(lat), parseFloat(lon)]);
        } catch (error) {
            setLoading(false);
            alert("Gagal mendapatkan lokasi. Coba lagi.");
        }
    };

    return (
        <div className="relative w-screen h-screen z-0">
            {loading && <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
                <div className="spinner" />
            </div>}
            {/* Peta */}
            <MapContainer
                center={[-6.983056, 110.4186]}
                zoom={13}
                style={{ width: "100%", height: "100%", zIndex:0 }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <LocateUserAndRoute destination={destination} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
