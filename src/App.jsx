// App.jsx
import React, {useEffect,  useState } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "./Context/AppContext";
import ChatRooms from "./Components/ChatRooms";
import RenderAllMessages from "./Components/RenderAllMessages";
import Login from "./Components/Login";
import ProfileSettings from "./Components/ProfileSettings";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [connection, setConnection] = useState(null);
  const [recivedMessages, setRecivedMessages] = useState([]);
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoged, setIsLoged] = useState(false);
  const [isInARoom, setIsInARoom] = useState(false)
  const [chatName, setChatName] = useState("")
  const [userInfo, setUserInfo] = useState({
    userId: "5d8c9046-0c60-4aba-b447-22879a0542cd",
    userName: username,
    picProfile: "src/assets/editar.png ",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  })
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const chatId = '21c1e6cf-25ff-4da0-94a9-fba47511dd2e';
    const userId = '5d8c9046-0c60-4aba-b447-22879a0542cd';
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Conectado ao hub!");
        if (isLoged && isInARoom) {
          newConnection.invoke('JoinChat', userId, chatId);
        }
      })
      .catch((error) => {
        console.error("Erro ao conectar ao hub:", error);
      });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [setConnection, isLoged, isInARoom]);

  return (
    <AppContext.Provider
      value={{
        isEditing, setIsEditing,
        userInfo, setUserInfo,
        chatName, setChatName,
        isInARoom, setIsInARoom,
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
        isInARoom ? (
          <div className="MainGrid">
            <h2 className="MainGridChatName">{chatName}</h2>
            <RenderAllMessages />
            <ProfileSettings />
          </div>
        ) : (
          <ChatRooms />
        )
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
}

export default App;
