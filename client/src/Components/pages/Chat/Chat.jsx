import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import './Chat.css'
import { useUserAuth } from '../../../context/UserAuthContext.js';

const socket = io(`${process.env.REACT_APP_MY_API_URL}`);
function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {user} = useUserAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: user.displayName,
    };
    setMessage("");
    setMessages([newMessage, ...messages]);
  };

  useEffect(() => {
    const reciveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, [messages]);

  return (
    <div className="chat-container">
      {console.log(user)}
      <h1>ConcatUS Chat</h1>
      <p>Abrí otra pestaña y mira la magia</p>
      <form onSubmit={handleSubmit} className='chat-from-container'>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder='write your message'
          className='chat-input'
        />
        {/* <button className="chat-send-button">Send</button> */}
        <ul className="chat-list-ul">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-from ${message.from === user.displayName ? 'message-from-me' : 'message-from-friend' }`}
            >
              <p>
                {message.from}: {message.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
      </div>

  );
}

export default Chat;
