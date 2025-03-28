import React, { useEffect, useState, useRef } from "react";
import chat from "../../../services/api/chat";

export default function ReadContent({ message, responseTxt, setRead }) {
  const [responseText, setResponseText] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [destination, setDestination] = useState("-");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      // Pesan sapaan awal
      const initialMessage = "Halo Mate, Mau Baca apa? Bilang aja";
      setMessages([{ sender: "ai", text: initialMessage }]);

      // Text-to-Speech untuk pesan awal
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(initialMessage);
      utterance.lang = "id-ID";
      synth.speak(utterance);
    }
  }, []); // Dipanggil sekali saat komponen dirender

  useEffect(() => {
    if (message) {
      handleSubmitVoice(message);
    }
  }, [message]);

  useEffect(() => {
    if (!responseTxt) return;

    // console.log("Response:", responseTxt);

    // Tambahkan pesan ke chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "ai", text: responseTxt || "No action received." },
    ]);

    // Text-to-Speech
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(responseTxt || "No action received.");
    utterance.lang = "id-ID";
    synth.speak(utterance);
  }, [responseTxt]);

  const handleSubmitVoice = async (inputMessage) => {
    const textToSend = inputMessage || inputValue;
    console.log(textToSend);

    if (!textToSend) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    setResponseText(null);

    // Add user's message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: textToSend },
    ]);

    try {
      const data = await chat(textToSend);
      const { action, value } = data;

      executeAction(action, value);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: value || "No action received." },
      ]);
      // Text-to-Speech
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(value || "No action received.");
      utterance.lang = "id-ID";
      synth.speak(utterance);

    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Failed to fetch response from the API." },
      ]);
    } finally {
      setLoading(false);
      setInputValue("");
    }
  };

  const executeAction = (action, value) => {
    if (action === "switch") {
      window.location.href = value;
    } else if (action === "go") {
      setDestination(value);
      setResponseText("Kamu berada di halaman ReadThat, untuk menggunakan navigasi beralih ke halaman Assistant")
      // setMap(value);
    } else if (action === "read"){
      setRead(true);
    } else if (action === "control") {
      console.log(`Control interval set to: ${value} ms`);
    } 
  };

  return (
    <div className="lg:w-[45vw] relative lg:pt-0 lg:p-0 z-10 lg:max-h-screen w-screen h-full">
        {/* <p className="text-lg mb-0 pl-2 font-bold text-non-active text-center lg:text-start">Asistant Mate</p> */}
      <div className="w-full h-full flex lg:hidden items-start justify-start px-5 py-2 gap-2  rounded-t-3xl bg-secondary absolute -top-4 left-0 z-10">
        <img src="/assets/images/assistant/destination.svg" alt="" />
        <p className=" text-background">Tujuan Destinasi </p>
        <p className=" text-background">{destination}</p>
      </div>
      <div className="flex flex-col w-full h-full lg:h-full gap-3 lg:gap-0 p-4 lg:p-0 pt-2 lg:pt-0 rounded-t-3xl border-[1px] border-gray-500 lg:rounded-xl z-50 relative top-5 left-0 lg:top-0 bg-background">
        {/* <div className="w-[20%] left-[40%] h-[5px] bg-background absolute -top-3.5 rounded-full z-50" /> */}
        <div className="chat-box p-2 lg:p-4 pb-20 lg:pb-0 rounded basis-5/6 lg:basis-full overflow-y-auto mb-4 lg:mb-0 ">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "user" ? "text-right" : "text-left flex gap-3 items-center"
              }`}
            >
              {msg.sender !== "user" && (
              <img src="/assets/images/profile.svg" alt="" />
              )}
              
              <div
                className={`inline-block ${
                  msg.sender === "user"
                    ? "bg-[#1E4FBC] text-white rounded-br-none"
                    : "bg-[#0D2352] text-white rounded-bl-none"
                } p-2 px-3 rounded-xl mb-5`}
              >
                <p className="lg:text-sm">
                  {typeof msg.text === "string"
                    ? msg.text
                    : JSON.stringify(msg.text)}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-message text-left">
              <div className="inline-block bg-gray-200 text-black p-2 rounded-lg my-2">
                <p>Typing...</p>
              </div>
            </div>
          )}
        </div>

        {/* <div className="flex flex-col gap-4 basis-1/6">
          <form onSubmit={handleSubmitType} className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your question"
              className="p-2 border rounded basis-5/6"
            />
            <button
              type="submit"
              className="p-2 bg-secondary basis-1/6 text-white rounded"
            >
              Submit
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
}
