import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../components/context/AuthContext";

const RedirectIfAuthenticated = ({ children }) => {
    const { decryptSession } = UserAuth();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Dekripsi sesi untuk mengetahui role
        const session = decryptSession();
        if (session) {
            setUserRole(session.role);
        }
    }, [decryptSession]);


    if (userRole) {
        if (userRole === "Admin") return <Navigate to="/admin" replace />;
        if (userRole === "VI") return <Navigate to="/vi" replace />;
        if (userRole === "Guard") return <Navigate to="/guard" replace />;
    }

    return children; 
};

export default RedirectIfAuthenticated;
