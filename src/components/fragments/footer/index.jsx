import React from "react";

const Footer = () => {
  return (
        <footer className="bg-gray-50 text-gray-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Logo Section */}
            <div className="mb-8 md:mb-0 md:w-1/6">
                <h2 className="text-lg font-bold text-blue-600 flex items-center">
                    <svg
                        className="w-6 h-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 4.25 7 13 7 13s7-8.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                    VisionMate
                </h2>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 md:w-5/6 sm:grid-cols-4 gap-6 w-full  ">
                <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase">Product</h3>
                <ul className="mt-2 space-y-2 text-sm">
                    <li>Pricing</li>
                    <li>Overview</li>
                    <li>Browse</li>
                    <li>Accessibility</li>
                    <li>Five</li>
                </ul>
                </div>
                <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase">Solutions</h3>
                <ul className="mt-2 space-y-2 text-sm">
                    <li>Brainstorming</li>
                    <li>Ideation</li>
                    <li>Wireframing</li>
                    <li>Research</li>
                </ul>
                </div>
                <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase">Resources</h3>
                <ul className="mt-2 space-y-2 text-sm">
                    <li>Help Center</li>
                    <li>Blog</li>
                    <li>Tutorials</li>
                </ul>
                </div>
                <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase">Company</h3>
                <ul className="mt-2 space-y-2 text-sm">
                    <li>About</li>
                    <li>Press</li>
                    <li>Events</li>
                    <li>Careers</li>
                </ul>
                </div>
            </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
                © 2023 Protech, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-gray-700">
                Terms
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                Privacy
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                Contact
                </a>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-linkedin"></i>
                </a>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;
