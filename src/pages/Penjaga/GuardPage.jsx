import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../components/context/AuthContext";
import useSession from "../../hooks/useSession";
import LoadingPage from "../LoadingPage";

const GuardPage = () => {
    const { decryptSession, logOut } = UserAuth();
    const [userData, setUserData] = useState(null);
    useSession(decryptSession, setUserData);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
        {userData ? (
            <div>
            <h1>Guard Page</h1>
            {userData && (
                <>
                    <p>Welcome, {userData.fullName}!</p>
                    <p>Your role: {userData.id}</p>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </>
            )}
            <Link to="/guard/scan">Scan</Link>
            <Link to="/guard/monitoring">Monitoring</Link>
            <button onClick={handleLogOut}>LOGOUT</button>
        </div>
        ):(
            <LoadingPage />
        )}
        </>
    );
};

export default GuardPage;
