import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocateUserAndRoute from "../../elements/locateUser";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";


const MapComponent = ({ to, id, children }) => {
    const [destination, setDestination] = useState([]);
    const [placeName, setPlaceName] = useState("");
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [step, setStep] =useState("");
    const [distance, setDistance] = useState(null);
    

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
            setDestination([parseFloat(lat), parseFloat(lon)]);
        } catch (error) {
            setLoading(false);
            alert("Gagal mendapatkan lokasi. Coba lagi.");
        }
    };

    const handleSetStep = (data) => {
        setStep(data);
    };
    const handleSetDistance = (data) => {
        setDistance(data);
    };
    

    useEffect(() => {
        console.log(step)
    }, [step])

    return (
        <div className="relative w-screen h-screen z-0">
            {loading && (
                <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="spinner" />
                </div>
            )}

            {distance && distance.direction && distance.distance && (
                <div className="z-10 absolute gap-4 lg:gap-2 px-5 top-0 left-0 bg-background h-[5rem] flex justify-center items-center lg:top-20 lg:left-5 w-full lg:w-[40%] lg:rounded-md ">
                    {distance.direction === "W" && (
                        <img src="assets/images/arrow/up.svg" alt="" className="basis-1/6 "/>
                    )}
                    {distance.direction === "N" && (
                        <img src="assets/images/arrow/up.svg" alt="" className="basis-1/6 "/>
                    )}
                    {distance.direction === "E" && (
                        <img src="assets/images/arrow/up.svg" alt="" className="basis-1/6 "/>
                    )}
                    {distance.direction === "S" && (
                        <img src="assets/images/arrow/up.svg" alt="" className="basis-1/6 "/>
                    )}
                    <div className="flex flex-col items-start justify-center basis-5/6 ">
                        <h1 className="text-lg lg:text-md">{distance.distance} meter</h1>
                        <p className="text-md lg:text-sm">{step}</p>
                    </div>
                </div>
            )}
            {children}
            <MapContainer
                center={[-6.983056, 110.4186]}
                zoom={13}
                style={{ width: "100%", height: "100%", zIndex: 0 }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <LocateUserAndRoute destination={destination} audioEnabled={audioEnabled} id={id} setStep={handleSetStep} setDistance={handleSetDistance}/>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
