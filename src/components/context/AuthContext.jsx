import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../../services/lib/supabaseClient";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    // Register
    const registerNewUser = async (fullName, email, password, role, phone, language) => {
        try {
            // Hash password before saving to database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user data into the 'users' table
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

    // Login
    const login = async (email, password) => {
        try {
            // Fetch user data by email
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();

            if (error) {
                console.error("Login error: ", error);
                return { success: false, error: "User not found" };
            }

            // Validate password
            const isPasswordValid = await bcrypt.compare(password, data.password);
            if (!isPasswordValid) {
                return { success: false, error: "Invalid password" };
            }

            // Create session data and save to cookies
            const sessionData = {
                id: data.id,
                role: data.role,
            };

            Cookies.set("userSession", JSON.stringify(sessionData), { expires: 1, secure: true });
            setSession(sessionData);

            return { success: true, data: sessionData };
        } catch (error) {
            console.error("Unexpected login error: ", error);
            return { success: false, error };
        }
    };

    // Log Out
    const logOut = async () => {
        try {
            Cookies.remove("userSession");
            setSession(null);
        } catch (error) {
            console.error("Error during logout: ", error);
        }
    };

    useEffect(() => {
        const savedSession = Cookies.get("userSession");

        if (savedSession) {
            const parsedSession = JSON.parse(savedSession);
            setSession(parsedSession);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ session, login, registerNewUser, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
