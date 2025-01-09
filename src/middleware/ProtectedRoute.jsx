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

    const userRole = session.role;

    console.log("TESTT",userRole);
    if (!userRole) {
        console.error("User role is undefined");
        return <Navigate to="/login" replace />; // Redirect jika role tidak ditemukan
    }

    if (!allowedRoles.includes(userRole)) {
        // Redirect ke halaman tidak diizinkan jika role tidak sesuai
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
