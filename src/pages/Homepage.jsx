import React, { useEffect, useState } from "react";
import { UserAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/fragments/navbar";
import Hero from "../components/fragments/hero";
import Feature from "../components/fragments/feature";

const Homepage = () => {
  const { decryptSession } = UserAuth(); // Gunakan decryptSession
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mendekripsi sesi dari cookies
    const sessionData = decryptSession();
    if (sessionData) {
      setSession(sessionData);
    }
  }, [decryptSession, navigate]);

  return (
    <div className="bg-gray-50 w-screen min-h-screen">
      <Navbar session={session}/>
      <Hero />
      <Feature />
    </div>
  );
};

export default Homepage;
