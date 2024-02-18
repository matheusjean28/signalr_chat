import React, { useContext, useState, useEffect } from "react";
import ChatMain from "./ChatMain";
import AppContext from "../Context/AppContext";
import "../Styles/RenderMessage.css";

const RenderAllMessages = () => {
  const { connection, username } = useContext(AppContext);
  const [mensagens, setMensagens] = useState([]);


  connection.on("AddToGroup", (response) => {
    console.log(response)
  })


    connection.on("ReceiveMessage", (data) => {

      const newMessage = data[0];
      console.log("newmessage", newMessage)
      const _newMessage = {user: newMessage.user, userMessage: newMessage.message}
      if (!mensagens.find(message => message.user === newMessage.user && message.userMessage === newMessage.message)) {
        setMensagens(prevMensagens => [...prevMensagens, _newMessage]);
      }
    });

    connection.on("errormessage", (error) => {
    })


  // If last message is from the same user, don't render the "You" label
  const shouldRenderYouLabel =
    mensagens.length === 0 || mensagens[mensagens.length - 1].user !== username;

  return (
    <>
    <ul className="RenderMessageConteiner">
      {mensagens.map(({ user, userMessage  },index) => (
        <li
          key={`${user}-${index}-${Date.UTC}`}
          className={user === username ? "CurrentUser" : "OtherUser"}
        >
          <div
            className={user === username ? "CurrentUserSide" : "OtherUserSide"}
          >
            {user !== username && (
              <h4 className="RenderMessageOther">{user}</h4>
            )}
            <h5
              className={
                user === username ? "RenderMessageYou" : "RenderMessageOther"
              }
            >
              {shouldRenderYouLabel && user === username ? "You" : ""}
              {userMessage}
            </h5>
          </div>
        </li>
      ))}
      <ChatMain />
    </ul>
    </>

  );
};

export default RenderAllMessages;
