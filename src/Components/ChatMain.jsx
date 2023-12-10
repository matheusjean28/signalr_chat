import React, { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import RenderMessage from "./RenderMessage";
import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";
import WebSocketDemo from "./Demo.Component";

export default function ChatMain() {
  const { username, recivedMessages, setRecivedMessages } =
    useContext(AppContext);

  const [messageInput, setMessageInput] = useState("");

  const handleInputMessage = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div className="ChatMainConteiner">
      <RenderMessage
        recivedMessages={recivedMessages}
        currentUsername={username}
      />

      <div className="SendArea">
        <input
          className="messageInput"
          type="text"
          placeholder="Type your message!"
          value={messageInput}
          onChange={(e) => handleInputMessage(e)}
        />

        <button className="sendMessageButton" >
          Send
        </button>
      </div>
    </div>
  );
}
