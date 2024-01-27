import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";

const ChatMain = () => {
  const { connection, currentChat, userInfo, username } = useContext(AppContext);
  const [messageInput, setMessageInput] = useState("");
  
  const handleInputMessage = (e) => {
    setMessageInput(e.target.value);
  };

  const enviarMensagem = (e) => {
    e.preventDefault();

    if (messageInput.trim() === "") {
      console.error("Message cannot be empty");
      return;
    }
    //envolve on a try catch
    //send message method called here
   
  };


  return (
    <div className="ChatMainConteiner">
      <div className="SendArea">
        <input
          className="messageInput"
          type="text"
          placeholder="Type your message!"
          value={messageInput}
          onChange={(e) => handleInputMessage(e)}
        />

        <button
          className="sendMessageButton"
          onClick={(e) => {
            enviarMensagem(e);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatMain;
