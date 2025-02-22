import { supabase } from "../lib/supabaseClient";

// Fungsi untuk mengambil semua API Key
export const getAllApiKeys = async () => {
    const { data, error } = await supabase.from("api_keys").select("key_name, key_value");

    if (error || !data) {
        console.error("Error fetching API keys:", error);
        throw new Error("Failed to fetch API keys.");
    }

    return Object.fromEntries(data.map(({ key_name, key_value }) => [key_name, key_value]));
};

// Fungsi untuk memperbarui API Key
export const updateApiKey = async (keyName, newValue) => {
    const { error } = await supabase
        .from("api_keys")
        .update({ key_value: newValue })
        .eq("key_name", keyName);

    if (error) {
        console.error("Error updating API key:", error);
        throw new Error("Failed to update API key.");
    }
};
