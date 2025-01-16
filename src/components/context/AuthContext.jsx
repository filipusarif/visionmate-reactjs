import { createContext, useContext, useEffect } from "react";
import { supabase } from "../../services/lib/supabaseClient";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

// Kunci rahasia untuk enkripsi/dekripsi
const SECRET_KEY = "pejuterbang"; // Ganti dengan kunci rahasia yang aman

export const AuthContextProvider = ({ children }) => {
    // Fungsi untuk mendaftarkan pengguna baru
    const registerNewUser = async (fullName, email, password, role, phone, language) => {
        try {
            const { data: existingUser, error: checkError } = await supabase
            .from("users")
            .select("email")
            .eq("email", email)
            .single();

            if (checkError && checkError.code !== "PGRST116") { 
                console.error("Error checking existing email: ", checkError);
                return { success: false, error: "Error checking email availability" };
            }

            if (existingUser) {
                return { success: false, error: "Email is already registered" };
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const { data, error } = await supabase.from("users").insert([
                {
                    fullName: fullName,
                    email: email,
                    password: hashedPassword,
                    role: role,
                    phone: phone,
                    language: language,
                },
            ]);

            if (error) {
                console.error("Error registering new user: ", error);
                return { success: false, error };
            }

            return { success: true, data };
        } catch (error) {
            console.error("Unexpected error during registration: ", error);
            return { success: false, error };
        }
    };

    // Fungsi untuk login
    const login = async (email, password) => {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("id, fullName, role, password")
                .eq("email", email)
                .single();

            if (error) {
                console.error("Login error: ", error);
                return { success: false, error: "User not found" };
            }

            const isPasswordValid = await bcrypt.compare(password, data.password);
            if (!isPasswordValid) {
                return { success: false, error: "Invalid password" };
            }

            // Data yang akan disimpan dalam cookies
            const sessionData = {
                id: data.id,
                fullName: data.fullName,
                role: data.role,
            };

            // Encrypt session data before saving to cookies
            const encryptedData = CryptoJS.AES.encrypt(
                JSON.stringify(sessionData),
                SECRET_KEY
            ).toString();

            Cookies.set("userSession", encryptedData, { expires: 1, secure: true });

            return { success: true, data: sessionData };
        } catch (error) {
            console.error("Unexpected login error: ", error);
            return { success: false, error };
        }
    };

    // Fungsi untuk logout
    const logOut = async () => {
        try {
            Cookies.remove("userSession");
        } catch (error) {
            console.error("Error during logout: ", error);
        }
    };

    // Fungsi untuk mendekripsi sesi dari cookies
    const decryptSession = () => {
        const savedSession = Cookies.get("userSession");
        if (savedSession) {
            try {
                const bytes = CryptoJS.AES.decrypt(savedSession, SECRET_KEY);
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            } catch (error) {
                console.error("Error decrypting session:", error);
                return null;
            }
        }
        return null;
    };

    // Fungsi untuk mendapatkan sesi dari cookies
    const getSession = () => {
        const savedSession = Cookies.get("userSession");
        if (savedSession) {
            return savedSession;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ login, registerNewUser, logOut, decryptSession, getSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
