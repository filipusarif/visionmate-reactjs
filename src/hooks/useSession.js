import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSession = (decryptSession, setUserData) => {
    const navigate = useNavigate();

    useEffect(() => {
        const session = decryptSession();
        if (session) {
            setUserData(session);
        } else {
            navigate("/login");
        }
    }, [decryptSession, navigate, setUserData]);
};

export default useSession;
