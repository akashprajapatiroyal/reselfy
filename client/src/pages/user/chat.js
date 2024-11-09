import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const Chat = () => {
  const { sellerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <Layout title="Chat with Seller">
      <div className="container mt-3">
        <h2 className="text-center">Chat with Seller</h2>
        <div className="chat-box p-4 border rounded mb-3">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <span className={msg.sender === "user" ? "text-primary" : "text-secondary"}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
