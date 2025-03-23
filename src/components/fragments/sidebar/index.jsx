import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useEffect,useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';
import { supabase } from '../../../services/lib/supabaseClient';


const SidebarContext = createContext()

export default function Sidebar({ session,children }) {
    const [expanded, setExpanded] = useState(true)
    const [userData, setUserData] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { logOut } = UserAuth();

    const location = useLocation();

    const handleLogOut = async () => {
        try {
            await logOut();
            if (window.location.pathname === "/") {
                window.location.reload(); 
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };


    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.id) {
                try {
                    const { data, error } = await supabase
                        .from("users")
                        .select("photo, fullName, email")
                        .eq("id", session.id)
                        .single();

                    if (error) throw error;

                    setUserData(data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [session]);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    return (
        <aside className="hidden lg:block h-screen z-50 max-w-[18vw] sticky top-0 left-0">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
            <div className="p-4 pb-2 flex justify-between items-center mb-3">
            <Link to="/">
            <div className={` gap-3 transition-all flex overflow-hidden ${expanded ? " w-fit" : "w-0"}`}>
                <img
                    src="/assets/images/logo.png"
                    className={`overflow-hidden transition-all ${
                    expanded ? "w-10" : "w-0"
                    }`}
                    alt=""
                />
                <span className="self-center text-xl -ml-2 font-bold whitespace-nowrap dark:text-white">VisionMate</span>
            </div>
            </Link>


            <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg  hover:bg-gray-100"
            >
                {expanded ? <img className="w-6" src="/assets/images/sidebar.svg" alt="" /> : <img className="w-6" src="/assets/images/sidebarex.svg" alt="" />}
                
            </button>
            </div>

            <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
            </SidebarContext.Provider>

            {session ? (
                <div className="border-t flex p-3">
                    <img
                        src={userData.photo}
                        alt=""
                        className="w-10 h-10 rounded-md object-cover"
                    />
                    <div
                        className={`
                        flex justify-between items-center
                        overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                    `}
                    >
                        <div className="leading-4">
                        <h4 className="font-semibold">{userData.fullName}</h4>
                        <span className="text-xs text-gray-600">{userData.email}</span>
                        </div>
                        <MoreVertical size={20} onClick={toggleDropdown} className="cursor-pointer"/>
                        {isDropdownOpen && (
                            <div className="absolute bottom-16 right-0 mt-3 w-[18vw] bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <ul className="py-2">
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 w-full text-left"
                                    >
                                        <img src="/assets/images/logout.svg" alt="" />Keluar
                                </button>
                                </li>
                            </ul>
                            </div>
                        )}
                    </div>
                </div>
            ):(
                <div className="border-t flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`
                        flex justify-between items-center
                        overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                    `}
                    >
                        <div className="leading-4">
                        <h4 className="font-semibold">John Doe</h4>
                        <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            )}
            
        </nav>
        </aside>
    )
    }

    export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext)
    
    return (
        <li
        className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${
            active
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }
        `}
        >
        <img src={icon} alt="" className={`w-5 group-hover:opacity-100 opacity-60`}/>
        
        <span
            className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
            }`}
        >
            {text}
        </span>
        {alert && (
            <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
            }`}
            />
        )}

        {!expanded && (
            <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
            >
            {text}
            </div>
        )}
        </li>
    )
}