import React, { useContext, useState, useEffect } from "react";
import ChatMain from "./ChatMain";
import AppContext from "../Context/AppContext";
import "../Styles/RenderAllMessages.css";

const RenderAllMessages = () => {
  const { connection, recivedMessages, setRecivedMessages } =
    useContext(AppContext);
  const [mensagens, setMensagens] = useState([]);

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
    <div className="ConteinerDemo">
      <h1>Chat Demo</h1>
      <h3>The Guris</h3>
      <div>
        {console.log(mensagens)}
        {mensagens.map((mensagem, index) => (
          <div key={index}>{mensagem}</div>
        ))}
      </div>
          <ChatMain/>
    </div>
  );
};

export default RenderAllMessages;
