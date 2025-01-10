import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ session }) => {

    // State untuk mengontrol menu mobile
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk toggle menu
    const toggleMenu = () => setIsOpen(!isOpen);

    const navigate = useNavigate();

    const handleDashboardRedirect = () => {
        console.log("Redirecting, session.role:", session?.role); // Debugging
        if (session?.role === "VI") {
            navigate("/vi");
        } else if (session?.role === "Guard") {
            navigate("/guard");
        } else {
            console.error("Unknown role:", session?.role);
        }
    };

    return (
    <nav className="fixed w-full z-50 bg-background border-gray-200 py-2.5 dark:bg-gray-900">
        <div className='container'>
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="/" className="flex items-center">
                <img src="assets/images/logo.png" className="h-6 mr-3 sm:h-10" alt="Landwind Logo" />
                <span className="self-center text-xl -ml-2 font-bold whitespace-nowrap dark:text-white">VisionMate</span>
            </a>
            <div className="flex items-center lg:order-2">
                <div className="hidden mt-2 mr-4 sm:inline-block">
                    <span></span>
                </div>

                {session ? (
                    <button
                    onClick={handleDashboardRedirect}    
                        className="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-primary-hobg-primary-hover">Dashboard</button>
                ):(
                    <div className='flex gap-4 items-center'>
                        <Link to="/login"
                            className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Masuk</Link>
                        <Link to="/register"
                            className="text-white flex gap-1 items-center bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-primary-hobg-primary-hover">Daftar Sekarang <img src="assets/images/arrow-right.svg" alt="" /></Link>
                    </div>
                )}
                <button data-collapse-toggle="mobile-menu-2" type="button"
                    className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="mobile-menu-2" aria-expanded={isOpen ? 'true' : 'false'}>
                    <span className="sr-only">Open main menu</span>
                    <svg  className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <svg  className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div  className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                    <li>
                        <a href="#"
                            className="block py-2 pl-3 pr-4 text-white bg-primary rounded lg:bg-transparent lg:text-primary lg:p-0 dark:text-white"
                            aria-current="page">Beranda</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Fitur</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Demo</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Tentang Kami</a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </nav>
    )
}

export default Navbar;