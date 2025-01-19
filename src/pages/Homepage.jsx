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
import chat from "../services/api/chat";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Popup from "../components/elements/popup";

const Homepage = () => {
  const { decryptSession } = UserAuth(); // Gunakan decryptSession
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  // ================ popup control ===================
  const [showPopup, setShowPopup] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const pressTimer = useRef(null);
  const closeTimer = useRef(null);
  const recognitionRef = useRef(null);
  
  // ================ Hooks Homepage ===================
  useEffect(() => {
    AOS.init({
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
    });
    }, []);

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

  // ================================= Popup Modal Controll ===================================

  const handleMouseDown = () => {
    if(session?.role === "VI"){
      pressTimer.current = setTimeout(() => {
          window.speechSynthesis.cancel();
          setShowPopup(true);
      }, 1500);
    }
  };

  const handleMouseUp = () => {
    if(session?.role === "VI"){
      clearTimeout(pressTimer.current);

      if (showPopup) {
          closeTimer.current = setTimeout(() => {
              setShowPopup(false);
          }, 100);
      }
    }
  };

  useEffect(() => {
          if (showPopup) {
              const utterance = new SpeechSynthesisUtterance("Halo Mate, mau pindah halaman?");
              utterance.lang = "id-ID";
              utterance.onend = () => {
                  if (recognitionRef.current) {
                      recognitionRef.current.start();
                      setIsListening(true);
                  }
              };
              window.speechSynthesis.speak(utterance);
          } else {
              if (recognitionRef.current && isListening) {
                  recognitionRef.current.stop();
                  setIsListening(false);
              }
          }
      }, [showPopup]);

      useEffect(() => {
              if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
                  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                  recognitionRef.current = new SpeechRecognition();
                  recognitionRef.current.continuous = false;
                  recognitionRef.current.interimResults = false;
                  recognitionRef.current.lang = "id-ID";
      
                  recognitionRef.current.onresult = (event) => {
                      const result = event.results[0][0].transcript;
                      setTranscript(result);
                      console.log("Recognized speech:", result);
                  };
      
                  recognitionRef.current.onerror = (event) => {
                      console.error("Speech recognition error:", event.error);
                  };
              } else {
                  console.error("Speech Recognition API is not supported in this browser.");
              }
          }, []);

      useEffect(() => {
        handleSubmitVoice(transcript);
      },[transcript]);

      const executeAction = (action, value) => {
        if (action === "switch") {
          window.location.href = value;
        } else if (action === "go") {
          setMap(value);
        } else if (action === "control") {
          console.log(`Control interval set to: ${value} ms`);
        }
      };


      const handleSubmitVoice = async (inputMessage) => {
        const textToSend = inputMessage || inputValue;
        console.log(textToSend);
    
        if (!textToSend) {
          alert("Please enter a question.");
          return;
        }
    
        try {
          const data = await chat(textToSend);
          const { action, value } = data;
          executeAction(action, value);
        } catch (error) {
          console.log(error)
        }
      };

  return (
    <div className="bg-gray-50 w-screen min-h-screen"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}>
      <Navbar session={session} mode="home"/>
      <Hero />
      <Feature />
      <Pricing />
      <Demo />
      <Feedback />
      <FAQ />
      <Footer />
      <Popup text="Halo Mate, mau pindah halaman?" showPopup={showPopup} isListening={isListening} />
    </div>
  );
};

export default Homepage;
