import React, { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import RenderMessage from "./RenderMessage";
import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";

export default function ChatMain() {
  const {username, setUsername} = useContext(AppContext);

  const [messageInput, setMessageInput] = useState('');
  const [recivedMessages, setRecivedMessages] = useState([]);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:5146"
  );

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.text) {
      setRecivedMessages((prevMessages) => [
        ...prevMessages,
        { text: lastJsonMessage.text, username: lastJsonMessage.username }
      ]);
    }
  }, [lastJsonMessage]);

  const sendMessage = () => {
    const message = { text: messageInput, username };
    try {
      sendJsonMessage(message);
      console.log(username)
      setRecivedMessages((prevMessages) => [...prevMessages]);
      setMessageInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputMessage = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <>
      <div className="ChatMainConteiner">
        <RenderMessage recivedMessages={recivedMessages} />

        <div className="SendArea">
          <input
            className="messageInput"
            type="text"
            placeholder="Text your message!"
            value={messageInput}
            onChange={(e) => handleInputMessage(e)}
          />
          
          <button className="sendMessageButton" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
