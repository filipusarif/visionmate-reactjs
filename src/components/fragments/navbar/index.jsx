import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';
import { supabase } from '../../../services/lib/supabaseClient';
import { Link as ScrollLink } from 'react-scroll';


const Navbar = ({ session, mode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const { logOut } = UserAuth();

    const location = useLocation();

    
    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.id) {
                try {
                    const { data, error } = await supabase
                        .from("users")
                        .select("photo, fullName")
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


    const toggleMenu = () => setIsOpen(!isOpen);
    const handleDashboardRedirect = () => {
        console.log("Redirecting, session.role:", session?.role); 
        if (session?.role === "VI") {
            navigate("/vi");
        } else if (session?.role === "Guard") {
            navigate("/guard");
        } else {
            console.error("Unknown role:", session?.role);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

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

    return (
    <nav className={`fixed ${mode === "home" ? "block":"hidden lg:block"}  top-0 w-full z-50 bg-background font-medium border-gray-200 py-2.5 dark:bg-gray-900`}>
        <div className='container mx-auto'>
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
            <a href="/" className="flex items-center">
                <img src="/assets/images/logo.png" className="h-6 mr-3 sm:h-10" alt="Logo" />
                <span className="self-center text-xl -ml-2 font-bold whitespace-nowrap dark:text-white">VisionMate</span>
            </a>
            <div className="flex items-center lg:order-2">
                <div className="hidden mt-2 mr-4 sm:inline-block">
                    <span></span>
                </div>

                {session ? (
                    <div className='flex items-center gap-3'>
                        {mode === "home" && (
                        <button
                        onClick={handleDashboardRedirect}    
                        className="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-primary-hobg-primary-hover flex items-center gap-2"><img src="/assets/images/home.svg" alt="" /> Dashboard</button>
                        )}
                        <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="hidden md:flex items-center focus:outline-none"
                        >
                            <img
                            src={userData.photo}
                            alt="Profile"
                            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700"
                            />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
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
                    <div className='flex gap-4 items-center'>
                        <Link to="/login"
                            className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Masuk</Link>
                        <Link to="/register"
                            className="text-white hidden md:flex gap-1 items-center bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-primary-hobg-primary-hover">Daftar Sekarang <img src="/assets/images/arrow-right.svg" alt="" /></Link>
                    </div>
                )}
                <button data-collapse-toggle="mobile-menu-2" type="button"
                    className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="mobile-menu-2" aria-expanded={isOpen ? 'true' : 'false'} onClick={toggleMenu}>
                    <span className="sr-only">Open main menu</span>
                    <svg  className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"></path>
                    </svg>
                    <svg  className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
            {mode === "home" && (
                <div  className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                    <li>
                        <ScrollLink to="hero" smooth={true} duration={500} 
                            className="block cursor-pointer py-2 pl-3 pr-4 text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white"
                            aria-current="page">Beranda</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="price" smooth={true} duration={500} 
                            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Harga</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="demo" smooth={true} duration={500} 
                            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Demo</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="feedback" smooth={true} duration={500}
                            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Ulasan Kami</ScrollLink>
                    </li>
                    {session ? ( 
                        <li className='block md:hidden'>
                            <button onClick={handleLogOut}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">keluar</button>
                        </li>
                    ) : (
                        <li className='block md:hidden'>
                            <Link to="/register"
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Daftar Sekarang</Link>
                        </li>
                    )}
                </ul>
            </div>
            )}
            {mode === "vi" && (
                <div  className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                    <li>
                        <Link to="/"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                            >Branda</Link>
                    </li>
                    <li>
                        <Link to="/vi"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/vi" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                            aria-current="page">Asisten</Link>
                    </li>
                    <li>
                        <Link to="/vi/profile"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/vi/profile" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                        >Profil</Link>
                    </li>
                    <li>
                        <Link to="/vi/sos"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/vi/sos" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                        >Sos</Link>
                    </li>
                    <li>
                        <Link to="/vi/barcode"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/vi/barcode" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                        >Qr Code</Link>
                    </li>
                    {session ? ( 
                        <li className='block md:hidden'>
                            <button onClick={handleLogOut}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">keluar</button>
                        </li>
                    ) : (
                        <li className='block md:hidden'>
                            <Link to="/register"
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Daftar Sekarang</Link>
                        </li>
                    )}
                </ul>
            </div>
            )}
            {mode === "guard" && (
                <div  className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                    <li>
                        <Link to="/"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                            >Branda</Link>
                    </li>
                    <li>
                        <Link to="/guard"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/guard" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                            aria-current="page">Monitoring</Link>
                    </li>
                    <li>
                        <Link to="/guard/scan"
                            className={`block py-2 pl-3 pr-4 ${
                                location.pathname === "/guard/scan" 
                                    ? "text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white" 
                                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }`}>Hubungkan VI</Link>
                    </li>
                    {session ? ( 
                        <li className='block md:hidden'>
                            <button onClick={handleLogOut}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">keluar</button>
                        </li>
                    ) : (
                        <li className='block md:hidden'>
                            <Link to="/register"
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Daftar Sekarang</Link>
                        </li>
                    )}
                </ul>
            </div>
            )}
        </div>
        </div>
    </nav>
    )
}

export default Navbar;