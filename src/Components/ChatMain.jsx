import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import RenderMessage from "./RenderMessage";
import "../Styles/ChatMain.css";

export default function ChatMain() {
  const [messageInput, setMessageInput] = useState(String);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "ws://localhost:5146"
  );

  const sendMessage = () => {
    const message = { text: messageInput };
    try {
      sendJsonMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputMessage = (e) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  };

  return (
    <>
      <div className="ChatMainConteiner">
        <RenderMessage />

        <div className="SendArea">

        <input
          className="messageInput"
          type="text"
          placeholder="Text your message!"
          onChange={(e) => {
              handleInputMessage(e);
            }}
            />
        <button className="sendMessageButton" onClick={sendMessage}>
          Send
        </button>
            </div>
      </div>
    </>
  );
}
