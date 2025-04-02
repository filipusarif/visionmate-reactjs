import React, { useRef, useEffect, useState } from "react";
import { getActiveNevaApiKey } from "../../../services/api/apiKey";

export default function ReadCamera({ setCameraResponse, readStatus, setRead }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState("");

    const constraints = {
        video: {
            facingMode: isFrontCamera ? "environment" : "user",
        },
    };

    const switchCamera = () => setIsFrontCamera((prevState) => !prevState);

    useEffect(() =>{
        // console.log("mode",readStatus)
        if (readStatus) {
            setRead(false);
            // console.log("scanning")
            captureImage()
        }
    },[readStatus])

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const keys = await getActiveNevaApiKey();
                setApiKey(keys); 
                // console.log("Fetched API key:", keys);
            } catch (error) {
                console.error("Error fetching API key:", error);
                setError("Failed to fetch API key.");
            }
        };

        fetchApiKey();
    }, []);

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

    const captureImage = async () => {
        if (!apiKey) return;

        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            const context = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the canvas image to a base64 string
            const base64Image = canvas.toDataURL("image/png");

            // Prepare data to be sent to the API
            const data = {
                image: base64Image,
                api_key: apiKey,
            };

            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "/detectread/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data), // Send the base64 string as JSON
                });
                if (!response.ok) throw new Error("API error: " + response.statusText);
    
                const result = await response.json();
                const text = result.response.choices[0].message.content || "No response from API";
                setCameraResponse(text); // Pass the response text to the parent component
            } catch (error) {
                console.error("Error uploading image:", error);
                setCameraResponse("Maaf, gagal melakukan scan. lakukan scan ulang");
                setError("Failed to upload image or process the response.");
            }


            // canvas.toBlob(async (blob) => {
            //     const formData = new FormData();
            //     formData.append("file", blob, "image.png");
            //     formData.append("api_key", apiKey);

            //     try {
            //         const response = await fetch(import.meta.env.VITE_API_URL+"/detectread/", {
            //             method: "POST",
            //             body: formData,
            //         });
            //         if (!response.ok) throw new Error("API error: " + response.statusText);

            //         const data = await response.json();
            //         const text = data.response.choices[0].message.content || "No response from API";
            //         // console.log(text);
            //         setCameraResponse(text); // Panggil handler untuk mengirim responseText ke parent
            //         // console.log("scann sir")
            //     } catch (error) {
            //         console.error("Error uploading image:", error);
            //         setCameraResponse("Maaf, gagal melakukan scan. lakukan scan ulang")
            //         setError("Failed to upload image or process the response.");
            //     }
            // }, "image/png");
        }
    };


    return (
        <div className="w-full h-full">
            <video ref={videoRef} autoPlay playsInline className="rounded-none object-cover lg:rounded-md w-full h-full" ></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
    );
}
