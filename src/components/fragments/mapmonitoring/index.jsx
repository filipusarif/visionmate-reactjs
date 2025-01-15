import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocateUserAndRouteMonitoring from "../../elements/locateUser/monitoring";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const MapMonitoring = ({to, id, connections, destination, photo}) => {
        const [destinationSearch, setDestinationSearch] = useState([]);
        const [placeName, setPlaceName] = useState("");
        const [loading, setLoading] = useState(false);

    
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
                setDestinationSearch([parseFloat(lat), parseFloat(lon)]);
            } catch (error) {
                setLoading(false);
                alert("Gagal mendapatkan lokasi. Coba lagi.");
            }
        };

        useEffect(() => {
            console.log("hp p",photo)
        },[photo])

    return (
        <div className="relative w-screen h-screen z-0">
            {loading && (
                <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="spinner" />
                </div>
            )}
            <div className="relative w-full h-full">
            <MapContainer
                center={[-6.983056, 110.4186]}
                zoom={13}
                style={{ width: "100%", height: "100%", zIndex: 0 }}
                className="custom-map-container"
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                    />
                <LocateUserAndRouteMonitoring destination={destination} photo={photo} audioEnabled={false}  id={id} connections={connections} />
            </MapContainer>
            </div>
        </div>
    )
}

export default MapMonitoring;