import { useEffect, useState } from "react";
import Profile from "./Components/Profile";
import * as signalR from "@microsoft/signalr";
import AppContext from "./Context/AppContext";
import RenderAllMessages from "./Components/RenderAllMessages";
import Login from "./Components/Login";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [connection, setConnection] = useState(null);
  const [recivedMessages, setRecivedMessages] = useState([]);
  const [login, setLogin] = useState({
    name: String,
    email: String,
    password: String,
  });
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Conectado ao hub!");
      })
      .catch((error) => {
        console.error("Erro ao conectar ao hub:", error);
      });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [setConnection, isLoged]);

  return (
    <AppContext.Provider
      value={{
        isLoged,
        setIsLoged,
        login,
        setLogin,
        connection,
        setConnection,
        username,
        setUsername,
        recivedMessages,
        setRecivedMessages,
      }}
    >
      {isLoged ? (
        <div className="MainGrid">
          <RenderAllMessages />
          <Profile />
        </div>
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
}

export default App;
