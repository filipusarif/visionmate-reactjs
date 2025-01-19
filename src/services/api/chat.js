const chat = async (textToSend) => {
    const response = await fetch(import.meta.env.VITE_API_URL+"/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: textToSend,
            api_key: import.meta.env.VITE_NVIDIA_API_KEY,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
    }

    return await response.json();
}

export default chat;