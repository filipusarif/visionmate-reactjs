import React, { useRef, useEffect, useState } from "react";

export default function Camera({ setCameraResponse }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [error, setError] = useState(null);

    const constraints = {
        video: {
            facingMode: isFrontCamera ? "environment" : "user",
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

                canvas.toBlob(async (blob) => {
                    const formData = new FormData();
                    formData.append("file", blob, "image.png");
                    formData.append("api_key", import.meta.env.VITE_NEVA_API_KEY);

                    try {
                        const response = await fetch(import.meta.env.VITE_API_URL+"/detectneva/", {
                            method: "POST",
                            body: formData,
                        });
                        if (!response.ok) throw new Error("API error: " + response.statusText);

                        const data = await response.json();
                        const text = data.response.choices[0].message.content || "No response from API";
                        console.log(text);
                        setCameraResponse(text); // Panggil handler untuk mengirim responseText ke parent
                    } catch (error) {
                        console.error("Error uploading image:", error);
                        setError("Failed to upload image or process the response.");
                    }
                }, "image/png");
            }
        };

        const interval = setInterval(captureImage, 20000);

        return () => clearInterval(interval);
    }, [setCameraResponse]);

    return (
        <div className="absolute z-50 w-fit h-fit bottom-4 left-4 md:right-5 md:bottom-7 md:left-auto">
            <video ref={videoRef} autoPlay playsInline className="rounded-md h-[5rem] md:h-[150px] " ></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            {/* <button onClick={switchCamera} className="absolute -bottom-11 left-4 bg-blue-500 text-white p-2 rounded">
                Switch Camera
            </button> */}
        </div>
    );
}
