import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle, useMapEvent } from 'react-leaflet';
import L from 'leaflet'; // Pastikan Anda mengimpor L dari leaflet
import 'leaflet/dist/leaflet.css';


// Komponen untuk menemukan lokasi saat ini
function LocateUser() {
    const map = useMap();

    useEffect(() => {
        map.locate({
            setView: true, // Fokus peta ke lokasi pengguna
            maxZoom: 18,   // Zoom maksimum
            enableHighAccuracy: true, // Akurasi tinggi
        });

        // Event ketika lokasi ditemukan
        map.on("locationfound", (e) => {
            const { latlng, accuracy } = e;

            // Tambahkan Marker menggunakan L.marker
            const marker = L.marker(latlng); // Ganti Marker dari react-leaflet dengan L.marker
            marker.bindPopup(`You are within ${accuracy.toFixed(1)} meters from this point`).openPopup();
            marker.addTo(map);

            // Tambahkan Circle untuk area akurasi
            const circle = L.circle(latlng, { radius: accuracy }); // Ganti Circle dari react-leaflet dengan L.circle
            circle.addTo(map);
        });

        // Event ketika lokasi gagal ditemukan
        map.on("locationerror", () => {
            alert("Location access denied. Please allow location access.");
        });
    }, [map]);

    return null; // Tidak render UI
}

const MapComponent = () => {
    return (
        <div className="relative z-0 w-screen h-screen overflow-hidden">
            {/* Kontainer Peta */}
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '100%' }}>
                {/* Layer Peta OpenStreetMap */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="">VisionMate</a> contributors'
                />
                {/* <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
                
                {/* Komponen untuk mendeteksi dan menampilkan lokasi pengguna */}
                <LocateUser />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
