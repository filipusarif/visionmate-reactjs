import { useEffect, useState } from "react";

const ChatContent = ({ id, connections, setDestination, lastChats, onSelectChat }) => {
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
        <section className="lg:w-[40vw] lg:h-full w-full h-full p-5 lg:p-4 flex flex-col gap-3 lg:border-[1px] lg:border-gray-400 rounded-xl">
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
            </div>
            {/* <h1 className="text-xl font-medium">Monitoring Saudara Kamu</h1> */}

            {/* Connections List */}
            <div className="flex flex-col w-full">
                {filteredConnections.map((connection) => {
                    const lastChat = lastChats.find(chat => chat.id_user === connection.vi_id);
                    
                    return(
                    <div
                        key={connection.vi_id}
                        className="flex-col flex bg-white w-full border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelectChat(connection.vi_id)}
                        
                    >
                        <div className="flex items-start w-full">
                            <div className="flex items-center w-full gap-3 p-1 ">
                                {/* Profile Picture */}
                                <img
                                    src={connection.users.photo || "/placeholder-profile.jpg"}
                                    alt={connection.users.fullName}
                                    className="w-12 h-10 rounded-full object-cover"
                                
                                />
                                <div className="flex items-start justify-between border-b-[1px] w-full py-1">
                                    <div className="flex-1"
                                    >
                                        <h3 className="font-medium text-gray-800 text-lg">{connection.users.fullName}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                        {lastChat ? lastChat.chat : "Belum ada pesan"}
                                        </p>
                                    </div>
                                    <div className="text-[11px]  text-non-active font-semibold px-2 rounded-md py-1 h-fit ">
                                    {lastChat ? lastChat.created_at : "--:--"}
                                    </div>
                                </div>
                            </div>

                            {/* Active Status Indicator */}
                            
                            
                        </div>
                    </div>
                )})}
                {filteredConnections.length === 0 && (
                    <p className="text-gray-500 text-center">Tidak ada hasil yang ditemukan.</p>
                )}
            </div>
        </section>
    );
};

export default ChatContent;
