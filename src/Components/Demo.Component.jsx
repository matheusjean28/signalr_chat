import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const WebSocketDemo = () => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    return () => {

      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  useEffect(() => {

    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Conectado ao hub!');
        })
        .catch((error) => {
          console.error('Erro ao conectar ao hub:', error);
        });
    }
  }, [connection]);

  const enviarMensagem = () => {

    if (connection) {
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
      <button onClick={enviarMensagem}>Enviar Mensagem</button>
    </div>
  );
};

export default WebSocketDemo;
