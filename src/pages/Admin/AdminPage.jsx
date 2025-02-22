import { useEffect, useState } from "react";
import { getAllApiKeys, updateApiKey } from "../../services/api/apiKey";
import { UserAuth } from "../../components/context/AuthContext";
import useSession from "../../hooks/useSession";
import Navbar from "../../components/fragments/navbar";
import LoadingPage from "../LoadingPage";

const AdminPage = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [apiKeys, setApiKeys] = useState({});
    const [loading, setLoading] = useState(true);
    const [editedKeys, setEditedKeys] = useState({});

    useSession(decryptSession, setUserData);

    // Fetch API Key saat pertama kali halaman dibuka
    useEffect(() => {
        const fetchKeys = async () => {
            const keys = await getAllApiKeys();
            setApiKeys(keys);
            setEditedKeys(keys); // Menyimpan API Key untuk diedit
            setLoading(false);
        };

        fetchKeys();
    }, []);

    // Fungsi untuk update API Key di Supabase
    const handleUpdate = async (keyName) => {
        setLoading(true);
        const newValue = editedKeys[keyName];

        await updateApiKey(keyName, newValue);
        
        setApiKeys((prevKeys) => ({ ...prevKeys, [keyName]: newValue }));
        setLoading(false);
    };

    return (
        <section className="flex md:flex-row flex-col-reverse w-screen h-screen relative">
            {userData ? (
                <>
                    <Navbar session={userData} mode="admin" />
                    <div className="flex flex-col justify-center items-center w-full">
                        {loading ? (
                            <p>Loading API Keys...</p>
                        ) : (
                            Object.entries(apiKeys).map(([keyName, value]) => (
                                <div key={keyName} className="mb-4">
                                    <label className="block font-medium">{keyName}: </label>
                                    <input
                                        type="text"
                                        value={editedKeys[keyName]}
                                        onChange={(e) => 
                                            setEditedKeys({ ...editedKeys, [keyName]: e.target.value })
                                        }
                                        className="border p-2 rounded w-64"
                                    />
                                    <button 
                                        onClick={() => handleUpdate(keyName)}
                                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                                        disabled={loading}
                                    >
                                        Update
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </>
            ) : (
                <LoadingPage />
            )}
        </section>
    );
};

export default AdminPage;
