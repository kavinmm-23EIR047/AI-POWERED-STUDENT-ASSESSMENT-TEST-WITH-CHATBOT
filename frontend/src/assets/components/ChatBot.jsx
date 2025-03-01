import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! 😊 How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // Function to generate responses
  const getBotResponse = (userMessage) => {
    userMessage = userMessage.toLowerCase();

    if (userMessage.includes("hello") || userMessage.includes("hi")) {
      return "Hello! 😊 How can I assist you today?";
    } 
    else if (userMessage.includes("how are you")) {
      return "I'm just a chatbot, but I'm here to make your day better! 🌟 How are you feeling?";
    } 
    else if (userMessage.includes("sad") || userMessage.includes("stressed")) {
      return "I'm sorry to hear that. 💙 Want to talk about it?";
    } 
    else if (userMessage.includes("happy") || userMessage.includes("great")) {
      return "That's awesome! 😃 Keep up the positive vibes!";
    } 
    else if (userMessage.includes("thank you")) {
      return "You're very welcome! 💖 Always here to help.";
    } 
    else {
      return "I'm here to chat! Tell me how you're feeling. 💬";
    }
  };

  // Handle sending message
  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    }, 1000); // Delay for bot response
  };

  // Scroll to latest message
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
