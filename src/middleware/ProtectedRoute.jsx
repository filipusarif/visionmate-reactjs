import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../components/context/AuthContext";


const ProtectedRoute = ({ children, allowedRoles }) => {
    const { session } = UserAuth();

    if (session === null) {
        return <div>Loading...</div>;
    }

    if (!session) {
        // Redirect ke login jika tidak ada sesi
        return <Navigate to="/login" />;
    }

    const userRole = session.user.user_metadata?.role;

    console.log(userRole)
    if (!allowedRoles.includes(userRole)) {
        // Redirect ke halaman tidak diizinkan jika role tidak sesuai
        return <Navigate to="/unauthorized " replace />;
    }

    return children;
};

export default ProtectedRoute;
