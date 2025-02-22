import { getAllApiKeys } from "../api/apiKey";

const chat = async (textToSend) => {
    const keys = await getAllApiKeys();
    const apiKey = keys.VITE_NVIDIA_API_KEY;

    const response = await fetch(import.meta.env.VITE_API_URL+"/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: textToSend,
            api_key: apiKey,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
    }

    return await response.json();
}

export default chat;