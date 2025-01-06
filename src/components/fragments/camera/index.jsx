import React, { useRef, useState, useEffect } from "react";

export default function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [responseText, setResponseText] = useState("");
    const [error, setError] = useState(null);

    const constraints = {
        video: {
        facingMode: isFrontCamera ? "user" : "environment",
        },
    };

    const switchCamera = () => setIsFrontCamera((prevState) => !prevState);

    useEffect(() => {
        const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setError("Unable to access the camera.");
        }
        };

        startCamera();

        return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
        };
    }, [isFrontCamera]);

    useEffect(() => {
        const captureImage = async () => {
            if (canvasRef.current && videoRef.current) {
                const canvas = canvasRef.current;
                const video = videoRef.current;
                const context = canvas.getContext("2d");

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL("image/png");

                try {
                    const response = await fetch("http://localhost:8000/detectneva", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ 
                            image: imageData,
                            api_key: import.meta.env.VITE_NVIDIA_API_KEY, }),
                    });

                    if (!response.ok) throw new Error("API error: " + response.statusText);

                    const data = await response.json();
                    console.log("response image",data);
                    setResponseText(data.content || "No response from API");
                } catch (error) {
                console.error("Error uploading image:", error);
                setError("Failed to upload image or process the response.");
                }
            }
        };

        const interval = setInterval(captureImage, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute z-50 left-5 top-5">
        <video ref={videoRef} autoPlay playsInline className="rounded-md w-[40%]"></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        <button onClick={switchCamera} className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded">
            Switch Camera
        </button>
        {responseText && <div className="bg-white p-4 rounded shadow-md">{responseText}</div>}
        {/* {error && <div className="bg-red-500 text-white p-4 rounded shadow-md">{error}</div>} */}
        </div>
    );
}
