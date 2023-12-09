import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const WebSocketDemo = () => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceberMensagem", (usuario, mensagem) => {
      console.log(`${usuario}: ${mensagem}`);
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
  }, []);

  useEffect(() => {
    if (connection) {
      connection.onclose((error) => {
        console.error('Conexão fechada:', error);
      });

      connection.onreconnecting(() => {
        console.log('Reconectando...');
      });

      connection.onreconnected(() => {
        console.log('Reconectado!');
      });
    }
  }, [connection]);

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
      <button onClick={enviarMensagem}>Enviar Mensagem</button>
    </div>
  );
};

export default WebSocketDemo;
