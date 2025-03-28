import { useEffect, useState } from "react";

const MonitoringContent = ({ id, connections, setDestination }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // all, active, inactive
    const [filteredConnections, setFilteredConnections] = useState(connections);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (id) => {
        setDropdownOpen((prevId) => (prevId === id ? null : id)); // Tutup jika sama, buka jika beda
    };
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
        <div className="relative h-fit lg:h-full  lg:w-[60vw]">
            <div className="w-full lg:h-full max-h-[40vh] min-h-[40vh] flex lg:hidden items-start justify-center px-5 py-4 gap-2  rounded-t-xl bg-secondary absolute -top-9 left-0 z-10">
                <span className=" h-[5px] w-14 rounded-full bg-background"></span>
            </div>
            <section className="lg:w-full z-20 bg-white lg:max-h-full lg:min-h-full  relative w-screen max-h-[40vh] min-h-[40vh] p-5 lg:p-4 flex flex-col gap-3 border-[1px] border-gray-400 rounded-xl">
                {/* Search Bar and Filters */}
                <div className="flex items-center justify-between mb-1">
                    {/* Search Bar */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-1 text-md border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                    {/* <div className="relative">
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
                    </div> */}
                </div>
                {/* <h1 className="text-xl font-medium">Monitoring Saudara Kamu</h1> */}

                {/* Connections List */}
                <div className="flex flex-col gap-2 h-full w-full pb-10 overflow-auto">
                    {filteredConnections.map((connection) => {
                        const isOpen = isDropdownOpen === connection.vi_id;
                        return(
                        <div
                            key={connection.vi_id}
                            className="flex-col flex bg-white shadow-sm border-[1px] border-gray-400 rounded-lg"
                            
                        >
                            <div className="flex items-start p-3">
                                <div className="flex items-center w-[80%] gap-3 ">
                                    <img src="/assets/images/drop.svg" alt="" 
                                    className={`transition-transform duration-300 cursor-pointer ${
                                                isOpen ? "rotate-0" : "-rotate-90"
                                            }`}  
                                    onClick={() => toggleDropdown(connection.vi_id)} 
                                    />
                                    {/* Profile Picture */}
                                    <img
                                        src={connection.users.photo || "/placeholder-profile.jpg"}
                                        alt={connection.users.fullName}
                                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                        onClick={() =>
                                            setDestination([
                                                connection.users.latitude,
                                                connection.users.longitude,
                                            ])
                                        }
                                    />
                                    {/* Name and Status */}
                                    <div className="flex-1 cursor-pointer"
                                    onClick={() =>
                                        setDestination([
                                            connection.users.latitude,
                                            connection.users.longitude,
                                        ])
                                    }>
                                        <h3 className="font-medium text-gray-800 text-lg">{connection.users.fullName}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <img src="/assets/images/monitoring/location.svg" alt="" className="-translate-y-[2px]" />Jalan Pendirikan Timur
                                        </p>
                                    </div>
                                </div>

                                {/* Active Status Indicator */}
                                {connection.users.status ? (
                                    <div className="text-[10px] font-semibold px-2 rounded-md py-1 h-fit bg-[#1EC198] bg-opacity-20 text-[#1EC198]">
                                        WALKING
                                    </div>
                                ): (
                                    <div className="text-[10px] font-semibold px-2 rounded-md py-1 h-fit bg-[#FF576E] bg-opacity-20 text-[#FF576E]">
                                        UNACTIVE
                                    </div>
                                )}
                            </div>
                            <div
                                    className={`transition-all duration-300 overflow-hidden cursor-pointer ${
                                        isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                    onClick={() =>
                                        setDestination([
                                            connection.users.latitude,
                                            connection.users.longitude,
                                        ])
                                    }
                                >
                                    <div className="flex gap-2 justify-items-center items-center px-3">
                                        <span className="h-[1px] w-[50%] bg-gray-400"></span>
                                        <p className="text-sm text-gray-400">Detail</p>
                                        <span className="h-[1px] w-[50%] bg-gray-400"></span>
                                    </div>
                                    <main className="flex flex-col gap-2 items-center p-3">
                                        <div className="flex flex-row gap-2 items-center justify-center w-full">
                                            <div className="flex flex-col gap-0 w-[50%] h-full ">
                                                <h5 className="flex gap-1 items-center text-sm">
                                                    <img src="/assets/images/monitoring/destination.svg" alt="" />
                                                    Tujuan
                                                </h5>
                                                <p className="text-[12px]">Poliklinik Dian Nuswantoro</p>
                                            </div>
                                            <div className="flex flex-col gap-0 w-[50%] h-full ">
                                                <h5 className="flex gap-1 items-center text-sm">
                                                    <img src="/assets/images/monitoring/id.svg" alt="" />
                                                    Visual Impairment ID
                                                </h5>
                                                <p className="text-[12px]">#{connection.vi_id}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center justify-center w-full">
                                            <div className="flex flex-col gap-0 w-[50%] h-full ">
                                                <h5 className="flex gap-1 items-center text-sm">
                                                    <img src="/assets/images/monitoring/estimation.svg" alt="" />
                                                    Estimasi
                                                </h5>
                                                <p className="text-[12px]">30 Menit</p>
                                            </div>
                                            <div className="flex flex-col gap-0 w-[50%] h-full ">
                                                <h5 className="flex gap-1 items-center text-sm">
                                                    <img src="/assets/images/monitoring/distance.svg" alt="" />
                                                    Jarak dari Anda
                                                </h5>
                                                <p className="text-[12px]">5 Menit</p>
                                            </div>
                                        </div>
                                    </main>
                                </div>
                        </div>
                    )})}
                    {filteredConnections.length === 0 && (
                        <p className="text-gray-500 text-center">Tidak ada hasil yang ditemukan.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MonitoringContent;
