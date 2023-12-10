import React, { useState, useEffect, useContext } from 'react';
import * as signalR from '@microsoft/signalr';

const WebSocketContext = React.createContext();

const WebSocketProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

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

  return (
    <WebSocketContext.Provider value={connection}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
