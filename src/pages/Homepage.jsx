import React, { useState } from "react";
import { UserAuth } from "../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/fragments/navbar";
import Hero from "../components/fragments/hero";

const Homepage = () => {
  const { session, logOut } = UserAuth();
  const navigate = useNavigate();

  console.log("homepage",session);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

  return (
    <div className="bg-gray-50 w-screen min-h-screen">
      <Navbar session={session}/>
      <Hero />
      {/* Hero Section */}
      {/* <header className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center">
        <div className="lg:w-1/2">
          <p className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-lg inline-block mb-4">
            #1 Vision Map App 2024
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Confidence in Every Step with Your Smart Assistant.
          </h1>
          <p className="text-gray-600 mb-6">
            VisionMate is your innovative web application designed to empower
            the visually impaired with greater independence and confidence.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
              Get Started
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg">
              Learn More
            </button>
          </div>
        </div>

       
        <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img
            src="https://via.placeholder.com/300x400" // Replace with actual image URL
            alt="VisionMate"
            className="rounded-lg shadow-lg"
          />
        </div>
      </header> */}

      {/* Trusted By Section */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg sm:text-xl text-gray-600 mb-4">Trusted By</h2>
          <div className="flex flex-wrap justify-center space-x-4 space-y-4">
            <span className="text-2xl md:text-3xl text-gray-400">G</span>
            <span className="text-2xl md:text-3xl text-gray-400">G</span>
            <span className="text-2xl md:text-3xl text-gray-400">G</span>
          </div>
          <p className="mt-6 text-base sm:text-lg font-bold text-green-600">
            1200+ Our Users
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
