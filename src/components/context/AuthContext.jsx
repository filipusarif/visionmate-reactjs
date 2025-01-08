import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../../services/lib/supabaseClient";
import Cookies from "js-cookie";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(null);

    // Register
    const registerNewUser = async (fullName, email, password, role, phone, language) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    fullName: fullName,
                    role: role,
                    phone: phone,
                    language: language
                },
            }
        })

        if(error){
            console.error("there was a probelm register: ", error);
            return {success: false, error};
        }
        return { success: true, data};
    };

    // Login
    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.error("Login error occurred: ", error);
                return { success: false, error: error.message };
            }

            // Simpan sesi ke cookies
            Cookies.set("userSession", JSON.stringify(data.session), { expires: 1, secure: true });
            setSession(data.session);

            console.log("Login Success: ", data);
            return { success: true, data };
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    useEffect(() => {
        const savedSession = Cookies.get("userSession");
    
        if (savedSession) {
            const parsedSession = JSON.parse(savedSession);
            setSession(parsedSession);
        }
    
        // Sinkronkan dengan Supabase untuk mendeteksi perubahan state autentikasi
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                Cookies.set("userSession", JSON.stringify(session), { expires: 1, secure: true });
                setSession(session);
            } else {
                Cookies.remove("userSession");
                setSession(null);
            }
        });
    }, []);
    

    //Log Out
    const logOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("There was an error: ", error);
        }

        // Hapus sesi dari cookies
        Cookies.remove("userSession");
        setSession(null);
    };
    
    return (
        <AuthContext.Provider value={{session, login, registerNewUser, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};