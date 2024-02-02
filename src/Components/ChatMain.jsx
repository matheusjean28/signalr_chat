import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";
import { sendMessageToUserAsync } from "../ConnectionMethods/OnConnetionCalled";

const ChatMain = () => {
  const { connection, currentChat, userInfo, username } = useContext(AppContext);
  const [messageInput, setMessageInput] = useState("");

  const handleInputMessage = (e) => {
    setMessageInput(e.target.value);
  };

  connection.on("Error", (Error) => {
    console.log(Error)
  })

  connection.on("sendmessagetogroup", (conne) => {
    console.log(conne)
  })

 
  const enviarMensagem = async (e) => {
    e.preventDefault();

    if (messageInput.trim() === "") {
      console.error("Message cannot be empty");
      return;
    }
    else {
      try {
        var messageContent = { user: username, mensagem: messageInput }; 
        await connection.invoke("SendMessageToGroup", userInfo.Id, currentChat, messageContent, "token");
      } catch (error) {
        console.log(error)
      }
    }

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
          onClick={async (e) => {
            enviarMensagem(e);
            e.preventDefault();
          console.log("Connection id Value", connection.connectionId)

            // await connection.invoke("SendMessageToGroup", userInfo.Id, currentChat, messageInput, "token");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatMain;
