import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";

const ChatMain = () => {
  const { connection, currentChat, userInfo, username } = useContext(AppContext);
  const [messageInput, setMessageInput] = useState("");

  const enviarMensagem = (e) => {
    e.preventDefault();

    if (messageInput.trim() === "") {
      console.error("Message cannot be empty");
      return;
    }

    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      var chatId = currentChat;
      var message = messageInput;
      var userId = userInfo.Id;

      connection
        .invoke("SendMessageToUser", userId, username, message, chatId)
        .catch((error) => console.error("Error:", error));

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
