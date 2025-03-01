import React, { useState } from "react";

const Chatbot = ({ emotion }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm here to help. 😊" }
  ]);
  const [input, setInput] = useState("");

  // Predefined responses based on emotion
  const handleEmotionResponse = () => {
    if (emotion === "Stressed 😟" || emotion === "Sad 😢") {
      setMessages([...messages, { sender: "bot", text: "Take a deep breath! You're doing great. 💙" }]);
    }
  };

  // Handle user input
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "I understand. Stay positive! 😊" }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot-container">
      <h3>Chatbot Support</h3>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender}>
            <strong>{msg.sender === "bot" ? "🤖 Bot: " : "🙋 You: "}</strong>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
      
      {/* Trigger chatbot response based on detected emotion */}
      <button onClick={handleEmotionResponse} className="emotion-btn">
        Emotion Response
      </button>
    </div>
  );
};

export default Chatbot;
