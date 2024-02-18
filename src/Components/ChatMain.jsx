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
        //replace token by the user token when auth service is done
        console.log("ChatMain ", userInfo.Id)
        await connection.invoke("SendMessageToGroup", userInfo.Id, currentChat, username,  messageInput, "token");
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
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatMain;
