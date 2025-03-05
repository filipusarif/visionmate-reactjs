import { useEffect, useState } from "react";
import { getAllApiKeys, insertApiKey, activateApiKey, deleteApiKey } from "../../services/api/apiKey"; 
import { UserAuth } from "../../components/context/AuthContext";
import useSession from "../../hooks/useSession";
import Navbar from "../../components/fragments/navbar";
import LoadingPage from "../LoadingPage";

const AdminPage = () => {
    const { decryptSession } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [apiKeys, setApiKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nevaKey, setNevaKey] = useState("");
    const [nvidiaKey, setNvidiaKey] = useState("");

    useSession(decryptSession, setUserData);

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const fetchApiKeys = async () => {
        setLoading(true);
        try {
            const keys = await getAllApiKeys();
            setApiKeys(keys);
        } catch (error) {
            alert("Gagal mengambil API Key.");
        } finally {
            setLoading(false);
        }
    };

    const handleInsertNevaKey = async () => {
        if (!nevaKey) {
            alert("Nilai API Key Neva harus diisi!");
            return;
        }

        try {
            await insertApiKey("VITE_NEVA_API_KEY", nevaKey);
            setNevaKey("");
            fetchApiKeys();
        } catch (error) {
            alert("Gagal menambahkan API Key Neva.");
        }
    };

    const handleInsertNvidiaKey = async () => {
        if (!nvidiaKey) {
            alert("Nilai API Key NVIDIA harus diisi!");
            return;
        }

        try {
            await insertApiKey("VITE_NVIDIA_API_KEY", nvidiaKey);
            setNvidiaKey("");
            fetchApiKeys();
        } catch (error) {
            alert("Gagal menambahkan API Key NVIDIA.");
        }
    };

    const handleActivateKey = async (id, keyName) => {
        try {
            await activateApiKey(id, keyName);
            fetchApiKeys();
        } catch (error) {
            alert("Gagal mengaktifkan API Key.");
        }
    };

    const handleDeleteKey = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus API Key ini?")) return;

        try {
            await deleteApiKey(id);
            fetchApiKeys();
        } catch (error) {
            alert("Gagal menghapus API Key.");
        }
    };

    return (
        <section className="flex md:flex-row flex-col-reverse w-screen h-screen relative">
            {userData ? (
                <>
                    <Navbar session={userData} mode="admin" />
                    <div className="flex flex-col items-center w-full p-4 mt-16">
                        {loading ? (
                            <p>Loading API Keys...</p>
                        ) : (
                            <>
                                <div className="flex flex-col gap-8">
                                    {/* Input untuk Neva API Key */}
                                    <div className="bg-white shadow-md p-6 rounded-lg w-96">
                                        <h2 className="text-lg font-bold mb-2">Tambah VITE_NEVA_API_KEY</h2>
                                        <input
                                            type="text"
                                            placeholder="Masukkan API Key Neva"
                                            value={nevaKey}
                                            onChange={(e) => setNevaKey(e.target.value)}
                                            className="border p-2 rounded w-full mb-2"
                                        />
                                        <button
                                            onClick={handleInsertNevaKey}
                                            className="bg-green-500 text-white px-4 py-2 rounded w-full"
                                        >
                                            Tambah Neva Key
                                        </button>
                                    </div>

                                    {/* Input untuk NVIDIA API Key */}
                                    <div className="bg-white shadow-md p-6 rounded-lg w-96">
                                        <h2 className="text-lg font-bold mb-2">Tambah VITE_NVIDIA_API_KEY</h2>
                                        <input
                                            type="text"
                                            placeholder="Masukkan API Key NVIDIA"
                                            value={nvidiaKey}
                                            onChange={(e) => setNvidiaKey(e.target.value)}
                                            className="border p-2 rounded w-full mb-2"
                                        />
                                        <button
                                            onClick={handleInsertNvidiaKey}
                                            className="bg-green-500 text-white px-4 py-2 rounded w-full"
                                        >
                                            Tambah NVIDIA Key
                                        </button>
                                    </div>
                                </div>

                                {/* Tabel API Keys */}
                                <h2 className="text-xl font-bold mt-8 mb-4">Daftar API Key</h2>
                                <table className="w-full max-w-2xl border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-2">Nama API Key</th>
                                            <th className="border p-2">Nilai API Key</th>
                                            <th className="border p-2">Status</th>
                                            <th className="border p-2">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {apiKeys.map(({ id, key_name, key_value, status }) => (
                                            <tr key={id} className="hover:bg-gray-50 transition duration-200">
                                                <td className="border p-3">{key_name}</td>
                                                <td className="border p-3">{key_value}</td>
                                                <td className="border p-3">{status ? "Aktif" : "Nonaktif"}</td>
                                                <td className="border p-3 flex gap-2">
                                                    {!status && (
                                                        <button
                                                            onClick={() => handleActivateKey(id, key_name)}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Aktifkan
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteKey(id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
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
