import React, { useContext, useState, useEffect } from "react";
import ChatMain from "./ChatMain";
import AppContext from "../Context/AppContext";
import "../Styles/RenderMessage.css";

const RenderAllMessages = () => {
  const { connection, recivedMessages, setRecivedMessages } =
    useContext(AppContext);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    if (!connection) return;

    connection.on("ReceberMensagem", (usuario, mensagem) => {
      var objMessage = { user: usuario, userMessage: mensagem };

      console.log(Object.keys(objMessage));
      setMensagens((prevMensagens) => [...prevMensagens, objMessage]);
      setRecivedMessages((prevMensagens) => [...prevMensagens, objMessage]);
    });

    return () => {};
  }, [connection]);

  return (
    <ul className="RenderMessageConteiner">
      {mensagens.map(({ user, userMessage, index }) => (
        <li key={index}>
          {user} : {userMessage}
        </li>
      ))}
      <ChatMain />
    </ul>
  );
};

export default RenderAllMessages;
