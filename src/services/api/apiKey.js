import { supabase } from "../lib/supabaseClient";

// Fungsi untuk mengambil semua API Key dengan status
export const getAllApiKeys = async () => {
    const { data, error } = await supabase
        .from("api_keys")
        .select("id, key_name, key_value, status");

    if (error || !data) {
        console.error("Error fetching API keys:", error);
        throw new Error("Failed to fetch API keys.");
    }
    return data;
};

// Fungsi untuk menambahkan API Key baru dan memastikan hanya satu yang aktif per jenis
export const insertApiKey = async (keyName, keyValue) => {
    const keyType = keyName.includes("NEVA") ? "VITE_NEVA_API_KEY" : "VITE_NVIDIA_API_KEY";

    // Menonaktifkan API key lain dengan nama yang sama sebelum menambahkan yang baru
    await supabase
        .from("api_keys")
        .update({ status: false })
        .eq("key_name", keyType);

    // Menambahkan API key baru dengan status aktif
    const { error } = await supabase
        .from("api_keys")
        .insert([{ key_name: keyType, key_value: keyValue, status: true }]);

    if (error) {
        console.error("Error inserting API key:", error);
        throw new Error("Failed to insert API key.");
    }
};

// Fungsi untuk mengaktifkan API Key tertentu
export const activateApiKey = async (id, keyName) => {
    const keyType = keyName.includes("NEVA") ? "VITE_NEVA_API_KEY" : "VITE_NVIDIA_API_KEY";

    // Menonaktifkan semua API key lain dengan nama yang sama
    await supabase
        .from("api_keys")
        .update({ status: false })
        .eq("key_name", keyType);

    // Mengaktifkan API key yang dipilih
    const { error } = await supabase
        .from("api_keys")
        .update({ status: true })
        .eq("id", id);

    if (error) {
        console.error("Error activating API key:", error);
        throw new Error("Failed to activate API key.");
    }
};


export const getActiveNvidiaApiKey = async () => {
    const { data, error } = await supabase
        .from("api_keys")
        .select("key_value")
        .eq("key_name", "VITE_NVIDIA_API_KEY")
        .eq("status", true)
        .single();

    if (error || !data) {
        console.error("Error fetching active NVIDIA API key:", error);
        return null;
    }
    return data.key_value;
};

export const getActiveNevaApiKey = async () => {
    const { data, error } = await supabase
        .from("api_keys")
        .select("key_value")
        .eq("key_name", "VITE_NEVA_API_KEY")
        .eq("status", true)
        .single();

    if (error || !data) {
        console.error("Error fetching active Neva API key:", error);
        return null;
    }
    return data.key_value;
};

export const deleteApiKey = async (id) => {
    const { error } = await supabase
        .from("api_keys")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting API key:", error);
        throw new Error("Failed to delete API key.");
    }
};
