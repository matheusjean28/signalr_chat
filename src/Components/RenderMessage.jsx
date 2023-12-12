import React, { useContext, useState, useEffect } from "react";
import ChatMain from "./ChatMain";
import "../Styles/RenderMessage.css";
import AppContext from "../Context/AppContext";

const RenderMessage = () => {
  const { connection, recivedMessages, setRecivedMessages } =
    useContext(AppContext);
  const [mensagens, setMensagens] = useState([]);
  const { username, setUsername } = useContext(AppContext);
  useEffect(() => {
    if (!connection) return;

    connection.on("ReceberMensagem", (usuario, mensagem) => {
      setMensagens((prevMensagens) => [
        ...prevMensagens,
        `${usuario}: ${mensagem}`,
      ]);
      setRecivedMessages((prevMensagens) => [
        ...prevMensagens,
        `${usuario}: ${mensagem}`,
      ]);
    });

    return () => {};
  }, [connection]);


  return (
    <ul className="RenderMessageConteiner">
      {mensagens.map((message, index) => (
        <li
          className={ username === message.username ? "CurrentUser" : "OtherUser"}
          key={index}
        >
          <h4>
            {username === message.username ? "You:" : `${message.username}:`}
          </h4>
          <h5 className="RenderMessageH5">{message.text}</h5>
        </li>
      ))}
      <li className="CurrentUser">
        <h4>teste</h4>
      </li>
      <li className="OtherUser">
        <h4>teste</h4>
      </li>
      <ChatMain/>
    </ul>
  );
};

export default RenderMessage;
