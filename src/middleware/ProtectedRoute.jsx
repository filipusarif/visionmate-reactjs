import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../components/context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { decryptSession } = UserAuth();
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Dekripsi sesi dan simpan role
        const session = decryptSession();
        if (session) {
            setUserRole(session.role);
        }
        setIsLoading(false); // Set loading selesai
    }, [decryptSession]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userRole) {
        console.error("User role is undefined or session is invalid.");
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        console.warn("User does not have permission for this route.");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
