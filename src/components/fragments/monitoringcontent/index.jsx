import { useEffect, useState } from "react";

const MonitoringContent = ({ id, connections, setDestination }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // all, active, inactive
    const [filteredConnections, setFilteredConnections] = useState(connections);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // Filter connections setiap kali searchQuery, statusFilter, atau connections berubah
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        setFilteredConnections(
            connections.filter((connection) => {
                const matchesSearch =
                    connection.users.fullName.toLowerCase().includes(lowerCaseQuery);

                const matchesStatus =
                    statusFilter === "all" ||
                    (statusFilter === "active" && connection.users.status) ||
                    (statusFilter === "inactive" && !connection.users.status);

                return matchesSearch && matchesStatus;
            })
        );
    }, [searchQuery, statusFilter, connections]);

    // Fungsi untuk mengatur filter status dan menutup dropdown
    const handleFilterSelection = (filter) => {
        setStatusFilter(filter);
        setShowFilterDropdown(false); // Menutup dropdown setelah memilih filter
    };

    return (
        <section className="md:w-[35vw] md:h-screen w-screen h-[50%] p-5 lg:pt-20 flex flex-col gap-3">
            {/* Search Bar and Filters */}
            <div className="flex items-center justify-between mb-4">
                {/* Search Bar */}
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 21l-6-6m0 0l6-6m-6 6h12"
                        />
                    </svg>
                </div>

                {/* Filter Button */}
                <div className="relative">
                    <button
                        className="ml-3 px-4 py-2 border rounded-full shadow-sm flex items-center gap-2 hover:bg-gray-100"
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                        Filters
                    </button>

                    {/* Filter Dropdown */}
                    {showFilterDropdown && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-10">
                            <button
                                className={`block px-4 py-2 text-left w-full hover:bg-gray-100 ${
                                    statusFilter === "all" ? "font-medium" : ""
                                }`}
                                onClick={() => handleFilterSelection("all")}
                            >
                                Semua Status
                            </button>
                            <button
                                className={`block px-4 py-2 text-left w-full hover:bg-gray-100 ${
                                    statusFilter === "active" ? "font-medium" : ""
                                }`}
                                onClick={() => handleFilterSelection("active")}
                            >
                                Aktif
                            </button>
                            <button
                                className={`block px-4 py-2 text-left w-full hover:bg-gray-100 ${
                                    statusFilter === "inactive" ? "font-medium" : ""
                                }`}
                                onClick={() => handleFilterSelection("inactive")}
                            >
                                Tidak Aktif
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <h1 className="text-xl font-medium">Monitoring Saudara Kamu</h1>

            {/* Connections List */}
            <div className="flex flex-col gap-4">
                {filteredConnections.map((connection) => (
                    <div
                        key={connection.users.vi_id}
                        className="flex items-center gap-4 p-4 bg-white shadow rounded-lg cursor-pointer"
                        onClick={() =>
                            setDestination([
                                connection.users.latitude,
                                connection.users.longitude,
                            ])
                        }
                    >
                        {/* Profile Picture */}
                        <img
                            src={connection.users.photo || "/placeholder-profile.jpg"}
                            alt={connection.users.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        {/* Name and Status */}
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{connection.users.fullName}</h3>
                            <p className="text-sm text-gray-500">
                                Waktu berjalan: {connection.users.duration} Menit
                            </p>
                        </div>
                        {/* Active Status Indicator */}
                        <div
                            className={`w-3 h-3 rounded-full ${
                                connection.users.status ? "bg-green-500" : "bg-gray-300"
                            }`}
                        ></div>
                    </div>
                ))}
                {filteredConnections.length === 0 && (
                    <p className="text-gray-500 text-center">Tidak ada hasil yang ditemukan.</p>
                )}
            </div>
        </section>
    );
};

export default MonitoringContent;
