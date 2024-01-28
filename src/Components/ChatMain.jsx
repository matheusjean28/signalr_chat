import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import "../Styles/ChatMain.css";
import AppContext from "../Context/AppContext";
import { sendMessageToUserAsync } from "../ConnectionMethods/OnConnetionCalled";

const ChatMain = () => {
  const { connection, currentChat, userInfo, username } = useContext(AppContext);
  const [messageInput, setMessageInput] = useState("");

  connection.on("SendMessageToUser", (userId, user, message, currentChat) => {
    console.log(userId, user, message, currentChat)

  })

  connection.on("errorMessage", (erro) => {
    console.log(erro)
  })
  connection.on("reciveMessage", (arg) => {
    console.log(Object.values(arg))

  })

  const handleInputMessage = (e) => {
    setMessageInput(e.target.value);
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();

    if (messageInput.trim() === "") {
      console.error("Message cannot be empty");
      return;
    }
    else {

      try {
        const message = {usuario: "matheus", mensagem: "messa"}
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
          await connection.invoke("SendMessageToUser",
            "5d8c9046-0c60-4aba-b447-22879a0542cd",
             userInfo.UserName,
             message,
             currentChat
          );

        } else {
          console.error("Connection is not established or is not in a connected state.");
        }
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
