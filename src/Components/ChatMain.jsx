import React, { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import RenderMessage from "./RenderMessage";
import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";

export default function ChatMain() {
  const { username, recivedMessages, setRecivedMessages } =
    useContext(AppContext);

  const [messageInput, setMessageInput] = useState("");
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:5146/api/chat"  );

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.text) {
      setRecivedMessages((prevMessages) => [
        ...prevMessages,
        { text: lastJsonMessage.text, username: lastJsonMessage.username },
      ]);
    }
  }, [lastJsonMessage]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = { text: messageInput, username };

      try {
        sendJsonMessage(message);
        setMessageInput("");
      } catch (error) {
        console.error(error);
      }
    }
  };

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

        <button className="sendMessageButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
