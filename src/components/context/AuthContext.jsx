import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../../services/lib/supabaseClient";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

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
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if(error){
                console.error("Login error occured: ", error);
                return {success: false, error: error.message};
            }
            console.log("Login Success: ", data);
            return {success:true, data};
        } catch (error) {
            console.error("an error occured", error);
        }
    };

    useEffect(()=> {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    },[]);

    //Log Out
    const logOut = () => {
        const {error} = supabase.auth.signOut();
        if(error){
            console.error("there was an error: ", error);
        }
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