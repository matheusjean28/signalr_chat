import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "../Context/AppContext";

const WebSocketDemo = () => {
  const { connection, recivedMessages, setRecivedMessages } = useContext(AppContext);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    if (!connection) return;

    connection.on("ReceberMensagem", (usuario, mensagem) => {
      setMensagens((prevMensagens) => [...prevMensagens, `${usuario}: ${mensagem}`]);
      setRecivedMessages((prevMensagens) => [...prevMensagens, `${usuario}: ${mensagem}`])
    });

    return () => {
    };
  }, [connection]);

  const enviarMensagem = () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      connection
        .invoke("EnviarMensagem", "matheus", "Olá, mundo!")
        .catch((error) => {
          console.error("Erro ao enviar mensagem:", error);
        });
    }
  };

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <div>
        {mensagens.map((mensagem, index) => (
          <div key={index}>{mensagem}</div>
        ))}
      </div>
      <button onClick={enviarMensagem}>Enviar Mensagem</button>
    </div>
  );
};

export default WebSocketDemo;
