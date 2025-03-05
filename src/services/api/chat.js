import { getActiveNvidiaApiKey } from "../api/apiKey";

const chat = async (textToSend) => {
    const keys = await getActiveNvidiaApiKey();
    const apiKey = keys;

    console.log("Sending request to API with the following data:", {
        message: textToSend,
        api_key: apiKey,
    });

    const response = await fetch(import.meta.env.VITE_API_URL + "/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: textToSend,
            api_key: apiKey,
        }),
    });

    console.log("Received response from API:", response);

    if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
    }

    return await response.json();
}

export default chat;