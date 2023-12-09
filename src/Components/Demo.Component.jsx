import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const WebSocketDemo = () => {
  const [connection, setConnection] = useState(null);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceberMensagem", (usuario, mensagem) => {
      const novaMensagem = `${usuario}: ${mensagem}`;
      setMensagens([...mensagens, novaMensagem]);
    });

    setConnection(newConnection);

    newConnection.start()
      .then(() => {
        console.log('Conectado ao hub!');
      })
      .catch((error) => {
        console.error('Erro ao conectar ao hub:', error);
      });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [mensagens]);

  const enviarMensagem = () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      connection
        .invoke('EnviarMensagem', 'matheus', 'Olá, mundo!')
        .catch((error) => {
          console.error('Erro ao enviar mensagem:', error);
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
