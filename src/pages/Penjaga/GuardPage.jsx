import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../components/context/AuthContext";

const GuardPage = () => {
    const { decryptSession, logOut } = UserAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const session = decryptSession();
        if (session) {
            setUserData(session);
        } else {
            navigate("/login"); // Redirect jika sesi tidak ditemukan
        }
    }, [decryptSession, navigate]);

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div>
            <h1>Guard Page</h1>
            {userData && (
                <>
                    <p>Welcome, {userData.fullName}!</p>
                    <p>Your role: {userData.role}</p>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </>
            )}
            <Link to="/guard/scan">Scan</Link>
            <Link to="/guard/monitoring">Monitoring</Link>
            <button onClick={handleLogOut}>LOGOUT</button>
        </div>
    );
};

export default GuardPage;
