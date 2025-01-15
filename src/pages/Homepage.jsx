import React, { useEffect, useState, useRef } from "react";
import { UserAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/fragments/navbar";
import Hero from "../components/fragments/hero";
import Feature from "../components/fragments/feature";
import Pricing from "../components/fragments/pricing";
import Demo from "../components/fragments/demo";
import Feedback from "../components/fragments/feedback";
import FAQ from "../components/fragments/faq";
import Footer from "../components/fragments/footer";

const Homepage = () => {
  const { decryptSession } = UserAuth(); // Gunakan decryptSession
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Mendekripsi sesi dari cookies
    const sessionData = decryptSession();
    if (sessionData) {
      setSession(sessionData);
    }
  }, [decryptSession, navigate]);

  useEffect(() =>{
    console.log(session)
  },[session])

  useEffect(() => {
    if(session?.role === "VI"){
      if (isFirstRender.current) {
        isFirstRender.current = false;
        const initialMessage = "Halo mate, kamu di halaman beranda!";
    
        // Text-to-Speech untuk pesan awal
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(initialMessage);
        utterance.lang = "id-ID";
        synth.speak(utterance);
      }
    }
  }, [session]); 

  return (
    <div className="bg-gray-50 w-screen min-h-screen">
      <Navbar session={session} mode="home"/>
      <Hero />
      <Feature />
      <Pricing />
      <Demo />
      <Feedback />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Homepage;
