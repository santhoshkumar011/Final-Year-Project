import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, X } from "lucide-react";

const AiChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m your counselor assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true); // 👈 chatbot open/close state
  const chatEndRef = useRef(null);

  const BACKEND_URL = "http://localhost:5001";

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post(`${BACKEND_URL}/api/chat`, { message: input });

      const botMessage = {
        sender: "bot",
        text: response.data.reply || "Sorry, I couldn’t understand that.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong with the AI." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 flex justify-between items-center cursor-pointer rounded-2xl"
        onClick={() => setIsOpen(!isOpen)} // toggle chat
      >
        <h2 className="text-white font-bold">CounselBot</h2>
        <button className="text-white p-1 rounded-full">
          
        </button>
      </div>

      {/* Chat Body with smooth slide */}
      <div
        className={`bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden transition-max-h duration-500 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {/* Chat messages */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl break-words ${
                msg.sender === "bot"
                  ? "bg-gray-100 text-gray-900 self-start"
                  : "bg-blue-500 text-white self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-1"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChatbot;
