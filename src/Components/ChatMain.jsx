import React, { useContext, useEffect, useState } from "react";
import RenderMessage from "./RenderMessage";
import * as signalR from "@microsoft/signalr";

import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";

export default function ChatMain() {
  const { connection, username, recivedMessages, setRecivedMessages } =
    useContext(AppContext);

  const [messageInput, setMessageInput] = useState("");
 
  const enviarMensagem = (e) => {
    e.preventDefault();
  
    if (messageInput.trim() === '') {
      console.error("Message cannot be empyt");
      return;
    }
  
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      connection
        .invoke("EnviarMensagem", username, messageInput)
        .catch((error) => {
          console.error("Erro :", error);
        });
      setMessageInput("");
    }
  };
  
  

  const handleInputMessage = (e) => {
      setMessageInput(e.target.value);
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

        <button className="sendMessageButton" onClick={(e) => {
          enviarMensagem(e)
        }}>Send</button>
      </div>
    </div>
  );
}
