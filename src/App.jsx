import { useEffect, useState } from "react";
import AppContext from "./Context/AppContext";
import RenderAllMessages from "./Components/RenderAllMessages";
import Profile from "./Components/Profile";
import * as signalR from "@microsoft/signalr";
import "./App.css";

function App() {
  const [username, setUsername] = useState("matheus");
  const [connection, setConnection] = useState(null);
  const [recivedMessages, setRecivedMessages] = useState([]);

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
  }, [setConnection]);

  return (
    <AppContext.Provider
      value={{
        connection,
        setConnection,
        username,
        setUsername,
        recivedMessages,
        setRecivedMessages,
      }}
    >
      <div className="MainGrid">
        <RenderAllMessages/>
        <Profile />
      </div>
    </AppContext.Provider>
  );
}

export default App;
