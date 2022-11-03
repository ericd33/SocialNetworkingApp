import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import './Chat.css'
import { useUserAuth } from '../../../context/UserAuthContext.js';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import axios from "axios";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: grey[200],
  backgroundColor: grey[800],
  borderRadius: 20,
  marginTop: 10,
  marginLeft: -160,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const socket = io(`${process.env.REACT_APP_MY_API_URL}`);
function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {user, logOut} = useUserAuth();

  const userP = JSON.parse(window.localStorage.getItem("user"))
  let token = user.accessToken;

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
    }
  }, [messages]);

  function signOut() {
    logOut();
    localStorage.clear();
  }

  if(userP.enabled !== false) {
  return (
    <div className="chat-container">
                  <Link to={'/home'}><Button id='buttonEventDetail' sx={{position:'absolute', top:'0px', left:'0px',bgcolor: 'secondary.main', color:grey[800], fontWeight:'bold', mb:'10px',mt:'10px',ml:'10px'}} variant="contained">Back</Button></Link>
      <h1 className="title">ConcatUS Chat</h1>
      <h3 className="descrip">This is a global chat, meet everyone!</h3>
      <form onSubmit={handleSubmit} className='chat-from-container'>

      <TextField
                sx={{ marginTop: '20px'}}
                id="filled-multiline-static"
                label="Write a message"
                color="primary"
                value={message}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setMessage(e.target.value)}
              />


        {/* <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder='write your message'
          className='chat-input'
        /> */}
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

  )}
  else {
    return (
      <div className='HomeBanned'>
        <div className="banMessage">
          <h1>Your account was banned. Contact with the staff</h1>
          <h3>concatuss@gmail.com</h3>
          <Button id='logoutBanned' variant='outlined' color="error" onClick={signOut}>
            Back
          </Button>
        </div>
      </div>
    )
  }
}

export default Chat;
