import React, { useEffect, useState, useRef } from "react";

export default function MateContent({ message, responseTxt }) {
  const [responseText, setResponseText] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (message) {
      handleSubmitVoice(message);
    }
  }, [message]);

  useEffect(() => {
    if (!responseTxt) return;

    console.log("Response:", responseTxt);

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
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          api_key: import.meta.env.VITE_NVIDIA_API_KEY,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
      }

      const data = await response.json();
      const { action, value } = data;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: value || "No action received." },
      ]);
      // Text-to-Speech
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(value || "No action received.");
      utterance.lang = "id-ID";
      synth.speak(utterance);

      executeAction(action, value);
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

  const handleSubmitType = async (e) => {
    e.preventDefault();
    const textToSend = inputValue;
    console.log(textToSend);

    if (!textToSend) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    setResponseText(null);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: textToSend },
    ]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          api_key: import.meta.env.VITE_NVIDIA_API_KEY,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
      }

      const data = await response.json();
      const { action, value } = data;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: value || "No action received." },
      ]);
      
      // Text-to-Speech
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(value || "No action received.");
      utterance.lang = "id-ID";
      synth.speak(utterance);
      executeAction(action, value);
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
      alert(`Navigating to location: ${value}`);
    } else if (action === "control") {
      console.log(`Control interval set to: ${value} ms`);
    }
  };

  return (
    <div className="w-[30vw] p-5 flex flex-col gap-3">
      <h1 className="text-2xl mb-4">Simple Chat</h1>

      <div className="chat-box p-4 border rounded bg-gray-50 basis-5/6 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } p-2 rounded-lg my-2`}
            >
              <p>
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

      <div className="flex flex-col gap-4 basis-1/6">
        <form onSubmit={handleSubmitType}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your question"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
